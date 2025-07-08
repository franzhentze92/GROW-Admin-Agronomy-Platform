// Education API Service for G.R.O.W Education Platform
// Handles courses, lessons, enrollments, progress tracking, and certificates

import { supabase } from './supabaseClient';

// Types
export interface Course {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students_count: number;
  lessons_count: number;
  image?: string;
  price: number;
  type: 'Theory' | 'Practice' | 'Mixed';
  tags: string[];
  learning_objectives: string[];
  prerequisites: string[];
  certificate_available: boolean;
  language: string;
  status: 'draft' | 'published' | 'archived';
  instructor_id?: string;
  instructor_name: string;
  instructor_title: string;
  instructor_bio: string;
  instructor_avatar?: string;
  instructor_email?: string;
  instructor_website?: string;
  instructor_location: string;
  instructor_experience: string;
  instructor_specializations: string[];
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  content: any; // JSONB content
  order_index: number;
  is_locked: boolean;
  resources?: any;
  notes?: string;
  created_at: string;
  updated_at: string;
  video_url?: string;
}

export interface CourseEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at?: string;
  progress_percentage: number;
  last_accessed_at: string;
  status: 'active' | 'completed' | 'dropped';
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  is_completed: boolean;
  completed_at?: string;
  time_spent: number;
  quiz_score?: number;
  quiz_answers?: any;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseReview {
  id: string;
  user_id: string;
  course_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_number: string;
  issued_at: string;
  expires_at?: string;
  certificate_url?: string;
  created_at: string;
}

// Mock course data for fallback
const mockCourse: Course = {
  id: 'soil-testing-mastery',
  title: 'Soil Testing Mastery: Foundations of Nutrition Farming®',
  description: 'Master the art of soil test interpretation with Graeme Sait. Learn to decode soil reports, understand mineral interactions, and build precise correction strategies for optimal crop health and farm profitability.',
  category: 'soil-health',
  duration: '4 hours',
  level: 'Intermediate',
  rating: 4.9,
  students_count: 2156,
  lessons_count: 12,
  image: '/how-to-thumbnails-languages/graeme_sait_clips.png',
  price: 0,
  type: 'Mixed',
  tags: ['Soil Science', 'Nutrition Farming', 'Soil Testing', 'Mineral Balance', 'Crop Health'],
  learning_objectives: ['Understand soil test parameters', 'Learn mineral interactions', 'Develop correction strategies'],
  prerequisites: ['Basic agriculture knowledge'],
  certificate_available: true,
  language: 'English',
  status: 'published',
  instructor_name: 'Dr. Graeme Sait',
  instructor_title: 'Nutrition Farming Expert',
  instructor_bio: 'World-renowned soil health expert with 30+ years of experience.',
  instructor_location: 'Queensland, Australia',
  instructor_experience: '30+ years',
  instructor_specializations: ['Soil Health', 'Nutrition Farming', 'Mineral Balance'],
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z'
};

// Mock lesson data for fallback
const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    course_id: 'soil-testing-mastery',
    title: 'Introduction to Soil Testing',
    description: 'Learn the fundamentals of soil testing and why it\'s crucial for nutrition farming.',
    duration: '15 min',
    type: 'video',
    content: { video_url: '/videos/soil-testing-mastery/GROW-APP_ST_E1.mp4' },
    order_index: 1,
    is_locked: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'lesson-2',
    course_id: 'soil-testing-mastery',
    title: 'Understanding Soil Test Reports',
    description: 'Decode soil test reports and understand what each parameter means.',
    duration: '20 min',
    type: 'video',
    content: { video_url: '/videos/soil-testing-mastery/GROW-APP_ST_E2.mp4' },
    order_index: 2,
    is_locked: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'lesson-3',
    course_id: 'soil-testing-mastery',
    title: 'Mineral Interactions and Balance',
    description: 'Explore how different minerals interact and affect soil health.',
    duration: '25 min',
    type: 'video',
    content: { video_url: '/videos/soil-testing-mastery/GROW-APP_ST_E3.mp4' },
    order_index: 3,
    is_locked: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'lesson-4',
    course_id: 'soil-testing-mastery',
    title: 'Developing Correction Strategies',
    description: 'Learn how to develop precise correction strategies based on soil test results.',
    duration: '30 min',
    type: 'video',
    content: { video_url: '/videos/soil-testing-mastery/GROW-APP_ST_E4.mp4' },
    order_index: 4,
    is_locked: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// Course API Functions
export const courseApi = {
  // Get all published courses
  async getCourses(): Promise<Course[]> {
    try {
      const { data: courses, error } = await supabase
        .from('courses')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching courses:', error);
        throw new Error(error.message);
      }

      // Fetch all enrollment counts in one query
      const { data: counts } = await supabase
        .from('course_enrollment_counts')
        .select('course_id, students_count');
      const countMap = new Map((counts || []).map(c => [c.course_id, c.students_count]));

      // Fetch all lessons for all courses in one query
      const courseIds = (courses || []).map(c => c.id);
      const { data: lessons } = await supabase
        .from('lessons')
        .select('id, course_id');
      const lessonsCountMap = new Map();
      (lessons || []).forEach(lesson => {
        lessonsCountMap.set(
          lesson.course_id,
          (lessonsCountMap.get(lesson.course_id) || 0) + 1
        );
      });

      // Fetch all instructors for all courses in one query
      const instructorIds = Array.from(new Set((courses || []).map(c => c.instructor_id).filter(Boolean)));
      let instructorsMap = new Map();
      if (instructorIds.length > 0) {
        const { data: instructors } = await supabase
          .from('instructors')
          .select('id, name, avatar');
        instructorsMap = new Map((instructors || []).map(i => [i.id, { name: i.name, avatar: i.avatar }]));
      }

      // For each course, attach students_count, lessons_count, and instructor_name
      const coursesWithCounts = (courses || []).map((course) => ({
        ...course,
        students_count: countMap.get(course.id) || 0,
        lessons_count: lessonsCountMap.get(course.id) || 0,
        instructor_name: instructorsMap.get(course.instructor_id)?.name || 'TBD',
        instructor_avatar: instructorsMap.get(course.instructor_id)?.avatar || '',
      }));

      return coursesWithCounts;
    } catch (error) {
      console.error('Error in getCourses:', error);
      // Return mock data if database is not available
      return [mockCourse];
    }
  },

  // Get a single course by ID or slug
  async getCourseById(courseIdOrSlug: string): Promise<Course | null> {
    try {
      let { data: course, error } = await supabase
        .from('courses')
        .select('*')
        .eq('status', 'published')
        .eq('id', courseIdOrSlug)
        .single();

      if (error) {
        console.error('Error fetching course:', error);
        throw new Error(error.message);
      }

      // Fetch learning objectives
      const { data: objectives, error: objectivesError } = await supabase
        .from('course_learning_objectives')
        .select('objective')
        .eq('course_id', courseIdOrSlug);
      if (objectivesError) {
        console.warn('Error fetching learning objectives:', objectivesError);
      }
      // Fetch prerequisites
      const { data: prerequisites, error: prerequisitesError } = await supabase
        .from('course_prerequisites')
        .select('prerequisite')
        .eq('course_id', courseIdOrSlug);
      if (prerequisitesError) {
        console.warn('Error fetching prerequisites:', prerequisitesError);
      }
      // Fetch students count from the view
      const { data: countRow } = await supabase
        .from('course_enrollment_counts')
        .select('students_count')
        .eq('course_id', courseIdOrSlug)
        .single();

      return {
        ...course,
        learning_objectives: (objectives || []).map(o => o.objective),
        prerequisites: (prerequisites || []).map(p => p.prerequisite),
        students_count: countRow?.students_count || 0,
      };
    } catch (error) {
      console.error('Error in getCourseById:', error);
      // Return mock data if database is not available
      return mockCourse;
    }
  },

  // Search courses
  async searchCourses(query: string): Promise<Course[]> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('status', 'published')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching courses:', error);
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Error in searchCourses:', error);
      // Return filtered mock data if database is not available
      const mockCourses = [mockCourse];

      return mockCourses.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }
  }
};

// Lessons API Functions
export const lessonApi = {
  // Get lessons for a course
  async getLessonsByCourseId(courseId: string): Promise<Lesson[]> {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching lessons:', error);
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Error in getLessonsByCourseId:', error);
      // Return mock data if database is not available
      return mockLessons;
    }
  },

  // Get a single lesson by ID
  async getLessonById(lessonId: string): Promise<Lesson | null> {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single();

      if (error) {
        console.error('Error fetching lesson:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error in getLessonById:', error);
      // Return mock lesson if database is not available
      return mockLessons.find(lesson => lesson.id === lessonId) || null;
    }
  }
};

// Statistics API Functions
export const educationStatsApi = {
  // Get education statistics
  async getEducationStats(): Promise<{
    totalCourses: number;
    totalStudents: number;
    totalLessons: number;
    totalCertificates: number;
    averageRating: number;
  }> {
    try {
      const [
        { count: totalCourses },
        { count: totalStudents },
        { count: totalLessons },
        { count: totalCertificates },
        { data: avgRating }
      ] = await Promise.all([
        supabase.from('courses').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('course_enrollments').select('*', { count: 'exact', head: true }),
        supabase.from('lessons').select('*', { count: 'exact', head: true }),
        supabase.from('certificates').select('*', { count: 'exact', head: true }),
        supabase.from('courses').select('rating').eq('status', 'published')
      ]);

      const averageRating = avgRating && avgRating.length > 0
        ? avgRating.reduce((sum, course) => sum + (course.rating || 0), 0) / avgRating.length
        : 0;

      return {
        totalCourses: totalCourses || 0,
        totalStudents: totalStudents || 0,
        totalLessons: totalLessons || 0,
        totalCertificates: totalCertificates || 0,
        averageRating: Math.round(averageRating * 10) / 10
      };
    } catch (error) {
      console.error('Error in getEducationStats:', error);
      // Return mock stats if database is not available
      return {
        totalCourses: 1,
        totalStudents: 2156,
        totalLessons: 12,
        totalCertificates: 1500,
        averageRating: 4.9
      };
    }
  }
};

// Lesson Progress API Functions
export const lessonProgressApi = {
  // Mark a lesson as complete for a user
  async markLessonComplete(userId: string, courseId: string, lessonId: string, quizScore?: number, notes?: string): Promise<void> {
    try {
      console.log('Marking lesson complete:', { userId, courseId, lessonId, quizScore, notes });
      
      const { error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: userId,
          course_id: courseId,
          lesson_id: lessonId,
          is_completed: true,
          completed_at: new Date().toISOString(),
          quiz_score: quizScore,
          notes: notes,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error marking lesson complete:', error);
        throw new Error(error.message);
      }
      
      console.log('Lesson marked as complete successfully');
    } catch (error) {
      console.error('Error in markLessonComplete:', error);
      // For now, just log the error but don't throw - this allows the UI to work even if DB is not available
      console.warn('Database not available, but continuing with UI update');
    }
  },

  // Get progress for a specific lesson
  async getLessonProgress(userId: string, lessonId: string): Promise<{
    is_completed: boolean;
    completed_at?: string;
    quiz_score?: number;
    notes?: string;
  } | null> {
    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('is_completed, completed_at, quiz_score, notes')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching lesson progress:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error in getLessonProgress:', error);
      // Return null if database is not available
      return null;
    }
  },

  // Get progress for all lessons in a course
  async getCourseProgress(userId: string, courseId: string): Promise<{
    completedLessons: number;
    totalLessons: number;
    progressPercentage: number;
    lessonProgress: { [lessonId: string]: boolean };
  }> {
    try {
      // Get all lessons for the course
      const { data: lessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('id')
        .eq('course_id', courseId);

      if (lessonsError) {
        console.error('Error fetching lessons:', lessonsError);
        throw new Error(lessonsError.message);
      }

      const totalLessons = lessons?.length || 0;

      if (totalLessons === 0) {
        return {
          completedLessons: 0,
          totalLessons: 0,
          progressPercentage: 0,
          lessonProgress: {}
        };
      }

      // Get progress for all lessons
      const { data: progress, error: progressError } = await supabase
        .from('lesson_progress')
        .select('lesson_id, is_completed')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .eq('is_completed', true);

      if (progressError) {
        console.error('Error fetching course progress:', progressError);
        throw new Error(progressError.message);
      }

      const completedLessons = progress?.length || 0;
      const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

      // Create a map of lesson progress
      const lessonProgress: { [lessonId: string]: boolean } = {};
      progress?.forEach(p => {
        lessonProgress[p.lesson_id] = p.is_completed;
      });

      return {
        completedLessons,
        totalLessons,
        progressPercentage,
        lessonProgress
      };
    } catch (error) {
      console.error('Error in getCourseProgress:', error);
      // Return default progress if database is not available
      return {
        completedLessons: 0,
        totalLessons: 0,
        progressPercentage: 0,
        lessonProgress: {}
      };
    }
  },

  // Get all progress for a user
  async getUserProgress(userId: string): Promise<{
    [courseId: string]: {
      completedLessons: number;
      totalLessons: number;
      progressPercentage: number;
    };
  }> {
    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('course_id, lesson_id, is_completed')
        .eq('user_id', userId)
        .eq('is_completed', true);

      if (error) {
        console.error('Error fetching user progress:', error);
        throw new Error(error.message);
      }

      // Group by course
      const courseProgress: { [courseId: string]: { completedLessons: number; totalLessons: number; progressPercentage: number } } = {};
      
      data?.forEach(progress => {
        if (!courseProgress[progress.course_id]) {
          courseProgress[progress.course_id] = { completedLessons: 0, totalLessons: 0, progressPercentage: 0 };
        }
        courseProgress[progress.course_id].completedLessons++;
      });

      // Get total lessons for each course
      for (const courseId of Object.keys(courseProgress)) {
        const { data: lessons } = await supabase
          .from('lessons')
          .select('id', { count: 'exact', head: true })
          .eq('course_id', courseId);
        
        courseProgress[courseId].totalLessons = lessons?.length || 0;
        courseProgress[courseId].progressPercentage = courseProgress[courseId].totalLessons > 0 
          ? (courseProgress[courseId].completedLessons / courseProgress[courseId].totalLessons) * 100 
          : 0;
      }

      return courseProgress;
    } catch (error) {
      console.error('Error in getUserProgress:', error);
      return {};
    }
  }
}; 