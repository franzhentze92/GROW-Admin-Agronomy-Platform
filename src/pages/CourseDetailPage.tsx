import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
  CheckCircle,
  Circle,
  Lock,
  Download,
  MessageCircle,
  Share2,
  Heart,
  Calendar,
  MapPin,
  Mail,
  Globe,
  GraduationCap,
  Target,
  Zap,
  Leaf,
  Droplets,
  Shield,
  TrendingUp,
  Lightbulb,
  Loader2
} from 'lucide-react';
import { courseApi, lessonApi, lessonProgressApi } from '@/lib/educationApi';
import type { Course, Lesson } from '@/lib/educationApi';
import { supabase } from '@/lib/supabaseClient';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface AssignmentDetails {
  // Add appropriate properties for assignment details
}

interface Resource {
  // Add appropriate properties for resources
}

interface CourseReview {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor'>('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // State for real data
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courseProgress, setCourseProgress] = useState<{
    completedLessons: number;
    totalLessons: number;
    progressPercentage: number;
    lessonProgress: { [lessonId: string]: boolean };
  } | null>(null);
  const [instructor, setInstructor] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  // Fetch course and lessons data
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;
      try {
        setLoading(true);
        setError(null);
        const [courseData, lessonsData] = await Promise.all([
          courseApi.getCourseById(courseId),
          lessonApi.getLessonsByCourseId(courseId)
        ]);
        setCourse(courseData);
        setLessons(lessonsData);
        if (user?.id) {
          try {
            const progressData = await lessonProgressApi.getCourseProgress(user.id, courseId);
            setCourseProgress(progressData);
            setIsEnrolled(progressData.completedLessons > 0 || progressData.totalLessons > 0);
            setProgress(progressData.progressPercentage);
          } catch (progressError) {
            console.warn('Could not fetch course progress:', progressError);
            setCourseProgress({
              completedLessons: 0,
              totalLessons: lessonsData.length,
              progressPercentage: 0,
              lessonProgress: {}
            });
            setIsEnrolled(false);
            setProgress(0);
          }
        } else {
          setCourseProgress({
            completedLessons: 0,
            totalLessons: lessonsData.length,
            progressPercentage: 0,
            lessonProgress: {}
          });
          setIsEnrolled(false);
          setProgress(0);
        }
      } catch (err) {
        console.error('Error fetching course data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load course data');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [courseId, user?.id]);

  useEffect(() => {
    const fetchCourseAndInstructor = async () => {
      if (course?.instructor_id) {
        const { data: instructorData } = await supabase
          .from('instructors')
          .select('*')
          .eq('id', course.instructor_id)
          .single();
        setInstructor(instructorData);
      } else {
        setInstructor(null);
      }
    };
    fetchCourseAndInstructor();
  }, [course?.instructor_id]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    fetchUser();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#8cb33a]" />
            <p className="text-gray-600">Loading course...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !course) {
    return (
      <div className="container mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/app/education/online-learning/courses')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
        
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Course not found</h3>
          <p className="text-gray-600 mb-4">
            {error || 'The course you are looking for does not exist or is not available.'}
          </p>
          <Button onClick={() => navigate('/app/education/online-learning/courses')}>
            Browse All Courses
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      'soil-health': Droplets,
      'plant-health': Leaf,
      'human-health': Heart,
      'animal-health': Shield,
      'planetary-health': Globe,
      'technology': TrendingUp,
      'business': Target,
      'innovation': Lightbulb
    };
    return iconMap[category] || GraduationCap;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'soil-health': 'bg-[#eaf5d3] text-[#8cb33a]',
      'plant-health': 'bg-[#eaf5d3] text-[#8cb33a]',
      'human-health': 'bg-[#eaf5d3] text-[#8cb33a]',
      'animal-health': 'bg-[#eaf5d3] text-[#8cb33a]',
      'planetary-health': 'bg-[#eaf5d3] text-[#8cb33a]',
      'technology': 'bg-[#eaf5d3] text-[#8cb33a]',
      'business': 'bg-[#eaf5d3] text-[#8cb33a]',
      'innovation': 'bg-[#eaf5d3] text-[#8cb33a]'
    };
    return colorMap[category] || 'bg-gray-100 text-gray-700';
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'reading': return BookOpen;
      case 'quiz': return Target;
      case 'assignment': return Award;
      default: return Circle;
    }
  };

  const handleEnroll = async () => {
    if (!courseId) return;
    // Allow guest enrollment: use user.id if available, otherwise generate a guest ID
    let userId = user?.id;
    if (!userId) {
      // Generate or retrieve a guest ID from localStorage
      userId = localStorage.getItem('guest_id');
      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem('guest_id', userId);
      }
    }
    try {
      // Actually enroll the user (or guest) in the database
      const { error } = await supabase
        .from('course_enrollments')
        .insert({
          course_id: courseId,
          user_id: userId,
          enrolled_at: new Date().toISOString()
        });
      if (error) {
        alert('Enrollment failed: ' + error.message);
        return;
      }
      setIsEnrolled(true);
      setProgress(0);
      // Refetch course data to update students_count
      const updatedCourse = await courseApi.getCourseById(courseId);
      setCourse(updatedCourse);
    } catch (err) {
      console.error('Error enrolling in course:', err);
      alert('Failed to enroll in course. Please try again.');
    }
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.is_locked) {
      alert('This lesson is locked. Complete previous lessons to unlock.');
      return;
    }
    
    // Navigate to lesson content
    navigate(`/app/education/online-learning/courses/${courseId}/lessons/${lesson.id}`);
  };

  const completedLessons = courseProgress?.completedLessons || 0;
  const totalLessons = courseProgress?.totalLessons || lessons.length;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/app/education/online-learning/courses')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Courses
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Course Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge className={getCategoryColor(course.category)}>
                {course.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
              <Badge variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'secondary' : 'destructive'}>
                {course.level}
              </Badge>
              <Badge variant="outline">{course.type}</Badge>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {course.title}
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-justify">
              {course.description}
            </p>

            {/* Course Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{lessons.length} lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Updated {new Date(course.updated_at).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Progress Bar (if enrolled) */}
            {isEnrolled && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Course Progress</span>
                  <span>{Math.round((completedLessons / totalLessons) * 100)}%</span>
                </div>
                <Progress value={(completedLessons / totalLessons) * 100} className="h-3" />
                <p className="text-sm text-gray-600 mt-1">
                  {completedLessons} of {totalLessons} lessons completed
                </p>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex border-b border-gray-200">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'curriculum', label: 'Curriculum' },
                { id: 'instructor', label: 'Instructor' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#8cb33a] text-[#8cb33a]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">About This Course</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
                    {course.long_description || course.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(course.learning_objectives || []).map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#8cb33a] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
                  <ul className="space-y-2">
                    {(course.prerequisites || []).map((prereq, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Circle className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(course.tags || []).map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Course Curriculum</h3>
                {lessons.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-600">No lessons available yet. Check back soon!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {lessons.map((lesson, index) => {
                      const LessonIcon = getLessonIcon(lesson.type);
                      const isCompleted = courseProgress?.lessonProgress?.[lesson.id] || false;
                      const isLocked = lesson.is_locked;
                      
                      return (
                        <div
                          key={lesson.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            isLocked
                              ? 'bg-gray-50 border-gray-200'
                              : isCompleted
                              ? 'bg-[#eaf5d3] border-[#c3e17c]'
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => handleLessonClick(lesson)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                {isCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-[#8cb33a]" />
                                ) : isLocked ? (
                                  <Lock className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <LessonIcon className="h-5 w-5 text-gray-600" />
                                )}
                                <span className="text-sm font-medium text-gray-500">
                                  Lesson {lesson.order_index || index + 1}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                                <p className="text-sm text-gray-600">{lesson.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>{lesson.duration}</span>
                              <Badge variant="outline" className="text-xs">
                                {lesson.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'instructor' && (
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{instructor?.name || 'Instructor TBD'}</h3>
                    <p className="text-lg text-gray-600 mb-4">{instructor?.title || 'Course Instructor'}</p>
                    <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                      {instructor?.bio && instructor.bio}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {instructor?.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{instructor.location}</span>
                        </div>
                      )}
                      {instructor?.experience && (
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          <span>{instructor.experience} experience</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {instructor?.specializations && instructor.specializations.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {instructor.specializations.map((spec: string) => (
                        <Badge key={spec} variant="secondary">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Course Card */}
            <Card>
              <CardHeader>
                <div className="h-48 bg-cover bg-center bg-no-repeat rounded-lg mb-4" style={{ backgroundImage: `url('${course.image || '/how-to-thumbnails-languages/grow-courses.jpeg'}')` }} />
                <CardTitle className="text-2xl font-bold">
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </CardTitle>
                <CardDescription>
                  {course.price === 0 ? 'No payment required' : 'One-time payment'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEnrolled ? (
                  <Button 
                    onClick={handleEnroll}
                    className="w-full bg-[#8cb33a] hover:bg-[#729428]"
                    size="lg"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Enroll Now
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      // Navigate to the first lesson
                      const firstLesson = lessons[0];
                      if (firstLesson) {
                        navigate(`/app/education/online-learning/courses/${courseId}/lessons/${firstLesson.id}`);
                      } else {
                        alert('No lessons available yet. Check back soon!');
                      }
                    }}
                    className="w-full bg-[#8cb33a] hover:bg-[#729428]"
                    size="lg"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Continue Learning
                  </Button>
                )}
                
                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Course includes:</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-[#8cb33a]" />
                      <span>{lessons.length} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#8cb33a]" />
                      <span>{course.duration} of content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-[#8cb33a]" />
                      <span>Instructor support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#8cb33a]" />
                      <span>Full lifetime access</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage; 