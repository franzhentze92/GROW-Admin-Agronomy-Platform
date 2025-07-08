import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Loader2, Save, Plus, Trash, BookOpen, Play, Target, Award, Upload, FileText, Video as VideoIcon, Image, UserPlus, Settings, RefreshCw, Edit } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/hooks/use-toast';
import processedVideosData from '../../processed-videos.json';

const levels = ['Beginner', 'Intermediate', 'Advanced'];
const types = ['Theory', 'Practice', 'Mixed'];
const categories = [
  'Soil Health', 'Plant Health', 'Human Health', 'Animal Health', 'Planetary Health',
  'Crop Protection', 'Sustainable Practices', 'Technology', 'Business & Marketing', 'Innovation'
];

const lessonTypes = [
  { value: 'video', label: 'Video', icon: Play },
  { value: 'reading', label: 'Reading', icon: BookOpen },
  { value: 'quiz', label: 'Quiz', icon: Target },
  { value: 'assignment', label: 'Assignment', icon: Award },
];

export default function CourseEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState<string>('');
  const [course, setCourse] = useState<any>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [learningObjectives, setLearningObjectives] = useState<string[]>([]);
  const [prerequisites, setPrerequisites] = useState<string[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [lessonDraft, setLessonDraft] = useState({
    title: '',
    description: '',
    duration: '',
    type: 'video',
    order: 1,
    content: {} as any,
    videoFile: null as File | null,
    documentFile: null as File | null,
    imageFile: null as File | null,
    videoUrl: '',
    documentUrl: '',
    imageUrl: '',
    videoId: '' as string | null,
  });
  const [showInstructorForm, setShowInstructorForm] = useState(false);
  const [newInstructor, setNewInstructor] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    website: '',
    location: '',
    experience: '',
    specializations: [''],
    avatar: ''
  });
  const [growCourseVideos, setGrowCourseVideos] = useState<any[]>([]);
  const [editingLessonIndex, setEditingLessonIndex] = useState<number | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  // Fetch course data function
  const fetchCourseData = async () => {
    try {
      setLoading(true);
      console.log('=== FETCHING COURSE DATA ===');
      console.log('Course ID:', id);
      
      // Fetch course
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
      
      if (courseError) {
        console.error('Error fetching course:', courseError);
        throw courseError;
      }
      
      console.log('Course data fetched:', courseData);
      setCourse(courseData);
      setSelectedInstructorId(courseData.instructor_id || '');

      // Fetch tags
      const { data: tagsData, error: tagsError } = await supabase
        .from('course_tags')
        .select('tag')
        .eq('course_id', id);
      
      if (tagsError) {
        console.warn('Error fetching tags:', tagsError);
      } else {
        console.log('Tags fetched:', tagsData);
        setTags(tagsData?.map(t => t.tag) || []);
      }

      // Fetch learning objectives
      const { data: objectivesData, error: objectivesError } = await supabase
        .from('course_learning_objectives')
        .select('objective')
        .eq('course_id', id);
      
      if (objectivesError) {
        console.warn('Error fetching learning objectives:', objectivesError);
      } else {
        console.log('Learning objectives fetched:', objectivesData);
        setLearningObjectives(objectivesData?.map(o => o.objective) || []);
      }

      // Fetch prerequisites
      const { data: prerequisitesData, error: prerequisitesError } = await supabase
        .from('course_prerequisites')
        .select('prerequisite')
        .eq('course_id', id);
      
      if (prerequisitesError) {
        console.warn('Error fetching prerequisites:', prerequisitesError);
      } else {
        console.log('Prerequisites fetched:', prerequisitesData);
        setPrerequisites(prerequisitesData?.map(p => p.prerequisite) || []);
      }

      // Fetch lessons
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', id)
        .order('order_index', { ascending: true });
      
      if (lessonsError) {
        console.warn('Error fetching lessons:', lessonsError);
      } else {
        console.log('Lessons fetched:', lessonsData);
        // Transform lessons to ensure they have the 'order' property for frontend consistency
        const transformedLessons = lessonsData?.map(lesson => ({
          ...lesson,
          order: lesson.order_index // Add 'order' property for frontend consistency
        })) || [];
        setLessons(transformedLessons);
      }

      console.log('=== COURSE DATA FETCH COMPLETE ===');
      console.log('Final state - Course:', courseData);
      console.log('Final state - Tags:', tagsData?.map(t => t.tag) || []);
      console.log('Final state - Objectives:', objectivesData?.map(o => o.objective) || []);
      console.log('Final state - Prerequisites:', prerequisitesData?.map(p => p.prerequisite) || []);
      console.log('Final state - Lessons:', lessonsData || []);

    } catch (error: any) {
      console.error('Error in fetchCourseData:', error);
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Refresh function
  const handleRefresh = () => {
    setRefreshing(true);
    fetchCourseData();
  };

  useEffect(() => {
    // Fetch instructors
    const fetchInstructors = async () => {
      const { data, error } = await supabase
        .from('instructors')
        .select('*')
        .order('name', { ascending: true });
      if (!error && data) setInstructors(data);
    };
    fetchInstructors();

    // Load and filter videos from processed-videos.json
    const growVideos = processedVideosData.videos.filter(v => v.series === 'G.R.O.W Courses');
    setGrowCourseVideos(growVideos);
  }, []);

  useEffect(() => {
    // Fetch course by ID with all related data
    if (id) fetchCourseData();
  }, [id]);

  useEffect(() => {
    if (selectedInstructorId) {
      const found = instructors.find(i => i.id === selectedInstructorId);
      if (found && course) {
        setCourse((c: any) => ({ ...c, instructor_id: found.id }));
      }
    }
  }, [selectedInstructorId, instructors]);

  const handleFileUpload = async (file: File, type: 'video' | 'document' | 'image') => {
    if (!file) return null;
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `course-content/${type}s/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('course-assets')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('course-assets')
        .getPublicUrl(filePath);
      
      return publicUrl;
    } catch (error) {
      console.error('File upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleAddLesson = async () => {
    if (!lessonDraft.title.trim()) {
      toast({ title: 'Error', description: 'Lesson title is required', variant: 'destructive' });
      return;
    }
    
    try {
      let content: any = { ...lessonDraft.content };
      
      // Handle file uploads based on lesson type
      if (lessonDraft.type === 'video' && lessonDraft.videoFile) {
        const videoUrl = await handleFileUpload(lessonDraft.videoFile, 'video');
        if (videoUrl) content.videoUrl = videoUrl;
      }
      
      if (lessonDraft.type === 'reading' && lessonDraft.documentFile) {
        const documentUrl = await handleFileUpload(lessonDraft.documentFile, 'document');
        if (documentUrl) content.documentUrl = documentUrl;
      }
      
      if (lessonDraft.imageFile) {
        const imageUrl = await handleFileUpload(lessonDraft.imageFile, 'image');
        if (imageUrl) content.imageUrl = imageUrl;
      }
      
      // Add external URLs if provided
      if (lessonDraft.videoUrl) content.videoUrl = lessonDraft.videoUrl;
      if (lessonDraft.documentUrl) content.documentUrl = lessonDraft.documentUrl;
      if (lessonDraft.imageUrl) content.imageUrl = lessonDraft.imageUrl;
      
      const newLesson = {
        ...lessonDraft,
        order: lessons.length + 1,
        content: content
      };
      
      // Update lessons state
      const updatedLessons = [...lessons, newLesson];
      setLessons(updatedLessons);
      
      // Reset lesson draft completely with correct order for next lesson
      setLessonDraft({ 
        title: '', 
        description: '', 
        duration: '', 
        type: 'video', 
        order: updatedLessons.length + 1, // Use the updated lessons array length
        content: {} as any,
        videoFile: null as File | null,
        documentFile: null as File | null,
        imageFile: null as File | null,
        videoUrl: '',
        documentUrl: '',
        imageUrl: '',
        videoId: ''
      });
      
      toast({ title: 'Success', description: 'Lesson added successfully!' });
      
      // Update lessons_count in the courses table
      await updateLessonsCount(updatedLessons.length);
    } catch (error) {
      console.error('Error adding lesson:', error);
      toast({ title: 'Error', description: 'Failed to add lesson', variant: 'destructive' });
    }
  };

  const handleRemoveLesson = (idx: number) => {
    const newLessons = lessons.filter((_, i) => i !== idx);
    setLessons(newLessons);
    
    // Update lessons_count in the courses table
    updateLessonsCount(newLessons.length);
  };

  const handleSave = async () => {
    if (!course.title?.trim()) {
      toast({ title: 'Error', description: 'Course title is required', variant: 'destructive' });
      return;
    }
    if (!course.category) {
      toast({ title: 'Error', description: 'Course category is required', variant: 'destructive' });
      return;
    }
    if (!course.level) {
      toast({ title: 'Error', description: 'Course level is required', variant: 'destructive' });
      return;
    }
    if (!course.type) {
      toast({ title: 'Error', description: 'Course type is required', variant: 'destructive' });
      return;
    }
    if (!selectedInstructorId) {
      toast({ title: 'Error', description: 'Instructor is required', variant: 'destructive' });
      return;
    }

    try {
      setSaving(true);
      console.log('Starting course update for ID:', id);
      console.log('Course data to update:', course);
      console.log('Tags to save:', tags);
      console.log('Learning objectives to save:', learningObjectives);
      console.log('Prerequisites to save:', prerequisites);
      console.log('Lessons to save:', lessons);

      // 1. Update course
      let imageUrl = course.image;
      if (coverImageFile) {
        const uploadedUrl = await handleFileUpload(coverImageFile, 'image');
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      const courseUpdateData = {
        title: course.title,
        description: course.description,
        long_description: course.long_description,
        category: course.category,
        duration: course.duration,
        level: course.level,
        price: course.price,
        type: course.type,
        certificate_available: course.certificate_available,
        language: course.language,
        last_updated: course.last_updated,
        instructor_id: selectedInstructorId,
        lessons_count: lessons.length,
        status: course.status,
        image: imageUrl
      };

      console.log('Updating course with data:', courseUpdateData);

      const { data: updatedCourse, error: courseError } = await supabase
        .from('courses')
        .update(courseUpdateData)
        .eq('id', id)
        .select()
        .single();

      if (courseError) {
        console.error('Course update error:', courseError);
        throw courseError;
      }

      console.log('Course updated successfully:', updatedCourse);

      // 2. Update tags
      console.log('Updating tags...');
      await supabase.from('course_tags').delete().eq('course_id', id);
      if (tags.length > 0 && tags[0].trim()) {
        const tagsToInsert = tags
          .filter(tag => tag.trim())
          .map(tag => ({ course_id: id, tag: tag.trim() }));
        if (tagsToInsert.length > 0) {
          const { error: tagsError } = await supabase.from('course_tags').insert(tagsToInsert);
          if (tagsError) {
            console.error('Tags update error:', tagsError);
            throw tagsError;
          }
          console.log('Tags updated successfully');
        }
      }

      // 3. Update learning objectives
      console.log('Updating learning objectives...');
      await supabase.from('course_learning_objectives').delete().eq('course_id', id);
      if (learningObjectives.length > 0 && learningObjectives[0].trim()) {
        const objectivesToInsert = learningObjectives
          .filter(obj => obj.trim())
          .map(obj => ({ course_id: id, objective: obj.trim() }));
        if (objectivesToInsert.length > 0) {
          const { error: objectivesError } = await supabase.from('course_learning_objectives').insert(objectivesToInsert);
          if (objectivesError) {
            console.error('Learning objectives update error:', objectivesError);
            throw objectivesError;
          }
          console.log('Learning objectives updated successfully');
        }
      }

      // 4. Update prerequisites
      console.log('Updating prerequisites...');
      await supabase.from('course_prerequisites').delete().eq('course_id', id);
      if (prerequisites.length > 0 && prerequisites[0].trim()) {
        const prerequisitesToInsert = prerequisites
          .filter(pre => pre.trim())
          .map(pre => ({ course_id: id, prerequisite: pre.trim() }));
        if (prerequisitesToInsert.length > 0) {
          const { error: prerequisitesError } = await supabase.from('course_prerequisites').insert(prerequisitesToInsert);
          if (prerequisitesError) {
            console.error('Prerequisites update error:', prerequisitesError);
            throw prerequisitesError;
          }
          console.log('Prerequisites updated successfully');
        }
      }

      // 5. Update lessons
      console.log('Updating lessons...');
      console.log('Raw lessons data:', lessons);
      await supabase.from('lessons').delete().eq('course_id', id);
      if (lessons.length > 0) {
        const lessonsToInsert = lessons.map(lesson => {
          // Ensure content is properly formatted as JSONB
          let content = lesson.content;
          if (typeof content === 'string') {
            try {
              content = JSON.parse(content);
            } catch (e) {
              content = {};
            }
          }
          if (!content || typeof content !== 'object') {
            content = {};
          }
          
          const lessonData = {
            course_id: id,
            title: lesson.title || '',
            content: content,
            order_index: parseInt(lesson.order || lesson.order_index || 1),
            duration: lesson.duration || '',
            type: lesson.type || 'video',
            video_url: lesson.video_url || ''
          };
          console.log('Individual lesson data:', lessonData);
          return lessonData;
        });
        console.log('Lessons to insert:', lessonsToInsert);
        const { error: lessonsError } = await supabase.from('lessons').insert(lessonsToInsert);
        if (lessonsError) {
          console.error('Lessons update error:', lessonsError);
          console.error('Error details:', lessonsError.details);
          console.error('Error hint:', lessonsError.hint);
          throw lessonsError;
        }
        console.log('Lessons updated successfully');
      }

      console.log('All updates completed successfully');

      toast({ title: 'Success', description: 'Course updated successfully!' });
      
      // Update lessons_count in the courses table
      await updateLessonsCount(lessons.length);
      
      // Navigate back to course management
      navigate('/app/education/online-learning/course-management');
    } catch (error: any) {
      console.error('Error updating course:', error);
      toast({ 
        title: 'Error', 
        description: error?.message || JSON.stringify(error), 
        variant: 'destructive' 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAndStay = async () => {
    if (!course.title?.trim()) {
      toast({ title: 'Error', description: 'Course title is required', variant: 'destructive' });
      return;
    }
    if (!course.category) {
      toast({ title: 'Error', description: 'Course category is required', variant: 'destructive' });
      return;
    }
    if (!course.level) {
      toast({ title: 'Error', description: 'Course level is required', variant: 'destructive' });
      return;
    }
    if (!course.type) {
      toast({ title: 'Error', description: 'Course type is required', variant: 'destructive' });
      return;
    }
    if (!selectedInstructorId) {
      toast({ title: 'Error', description: 'Instructor is required', variant: 'destructive' });
      return;
    }

    try {
      setSaving(true);
      console.log('Starting course update for ID:', id);

      // 1. Update course
      let imageUrl = course.image;
      if (coverImageFile) {
        const uploadedUrl = await handleFileUpload(coverImageFile, 'image');
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      const courseUpdateData = {
        title: course.title,
        description: course.description,
        long_description: course.long_description,
        category: course.category,
        duration: course.duration,
        level: course.level,
        price: course.price,
        type: course.type,
        certificate_available: course.certificate_available,
        language: course.language,
        last_updated: course.last_updated,
        instructor_id: selectedInstructorId,
        lessons_count: lessons.length,
        status: course.status,
        image: imageUrl
      };

      const { data: updatedCourse, error: courseError } = await supabase
        .from('courses')
        .update(courseUpdateData)
        .eq('id', id)
        .select()
        .single();

      if (courseError) {
        console.error('Course update error:', courseError);
        throw courseError;
      }

      // 2. Update tags
      await supabase.from('course_tags').delete().eq('course_id', id);
      if (tags.length > 0 && tags[0].trim()) {
        const tagsToInsert = tags
          .filter(tag => tag.trim())
          .map(tag => ({ course_id: id, tag: tag.trim() }));
        if (tagsToInsert.length > 0) {
          const { error: tagsError } = await supabase.from('course_tags').insert(tagsToInsert);
          if (tagsError) throw tagsError;
        }
      }

      // 3. Update learning objectives
      await supabase.from('course_learning_objectives').delete().eq('course_id', id);
      if (learningObjectives.length > 0 && learningObjectives[0].trim()) {
        const objectivesToInsert = learningObjectives
          .filter(obj => obj.trim())
          .map(obj => ({ course_id: id, objective: obj.trim() }));
        if (objectivesToInsert.length > 0) {
          const { error: objectivesError } = await supabase.from('course_learning_objectives').insert(objectivesToInsert);
          if (objectivesError) throw objectivesError;
        }
      }

      // 4. Update prerequisites
      await supabase.from('course_prerequisites').delete().eq('course_id', id);
      if (prerequisites.length > 0 && prerequisites[0].trim()) {
        const prerequisitesToInsert = prerequisites
          .filter(pre => pre.trim())
          .map(pre => ({ course_id: id, prerequisite: pre.trim() }));
        if (prerequisitesToInsert.length > 0) {
          const { error: prerequisitesError } = await supabase.from('course_prerequisites').insert(prerequisitesToInsert);
          if (prerequisitesError) throw prerequisitesError;
        }
      }

      // 5. Update lessons
      console.log('Updating lessons...');
      console.log('Raw lessons data:', lessons);
      await supabase.from('lessons').delete().eq('course_id', id);
      if (lessons.length > 0) {
        const lessonsToInsert = lessons.map(lesson => {
          // Ensure content is properly formatted as JSONB
          let content = lesson.content;
          if (typeof content === 'string') {
            try {
              content = JSON.parse(content);
            } catch (e) {
              content = {};
            }
          }
          if (!content || typeof content !== 'object') {
            content = {};
          }
          
          const lessonData = {
            course_id: id,
            title: lesson.title || '',
            content: content,
            order_index: parseInt(lesson.order || lesson.order_index || 1),
            duration: lesson.duration || '',
            type: lesson.type || 'video',
            video_url: lesson.video_url || ''
          };
          console.log('Individual lesson data:', lessonData);
          return lessonData;
        });
        console.log('Lessons to insert:', lessonsToInsert);
        const { error: lessonsError } = await supabase.from('lessons').insert(lessonsToInsert);
        if (lessonsError) {
          console.error('Lessons update error:', lessonsError);
          console.error('Error details:', lessonsError.details);
          console.error('Error hint:', lessonsError.hint);
          throw lessonsError;
        }
        console.log('Lessons updated successfully');
      }

      console.log('=== SAVE COMPLETE - VERIFYING DATA ===');
      
      // Verify the data was saved by fetching it again
      const { data: verifyCourse } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
      
      const { data: verifyTags } = await supabase
        .from('course_tags')
        .select('tag')
        .eq('course_id', id);
      
      const { data: verifyObjectives } = await supabase
        .from('course_learning_objectives')
        .select('objective')
        .eq('course_id', id);
      
      const { data: verifyPrerequisites } = await supabase
        .from('course_prerequisites')
        .select('prerequisite')
        .eq('course_id', id);
      
      const { data: verifyLessons } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', id)
        .order('order_index', { ascending: true });

      console.log('=== VERIFICATION RESULTS ===');
      console.log('Verified Course:', verifyCourse);
      console.log('Verified Tags:', verifyTags?.map(t => t.tag) || []);
      console.log('Verified Objectives:', verifyObjectives?.map(o => o.objective) || []);
      console.log('Verified Prerequisites:', verifyPrerequisites?.map(p => p.prerequisite) || []);
      console.log('Verified Lessons:', verifyLessons || []);

      toast({ title: 'Success', description: 'Course updated successfully!' });
      
      // Update lessons_count in the courses table
      await updateLessonsCount(lessons.length);
    } catch (error: any) {
      console.error('Error updating course:', error);
      toast({ 
        title: 'Error', 
        description: error?.message || JSON.stringify(error), 
        variant: 'destructive' 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCreateInstructor = async () => {
    if (!newInstructor.name.trim()) {
      toast({
        title: "Error",
        description: "Instructor name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('instructors')
        .insert({
          name: newInstructor.name,
          title: newInstructor.title,
          bio: newInstructor.bio,
          email: newInstructor.email,
          website: newInstructor.website,
          location: newInstructor.location,
          experience: newInstructor.experience,
          specializations: newInstructor.specializations.filter(s => s.trim())
        })
        .select('*')
        .single();

      if (error) throw error;

      setInstructors([...instructors, data]);
      setSelectedInstructorId(data.id);
      setShowInstructorForm(false);
      setNewInstructor({
        name: '', title: '', bio: '', email: '', website: '', location: '', experience: '', specializations: [''], avatar: ''
      });

      toast({
        title: "Success",
        description: "Instructor created successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateLesson = () => {
    if (editingLessonIndex !== null) {
      const updatedLessons = [...lessons];
      updatedLessons[editingLessonIndex] = { ...lessonDraft };
      setLessons(updatedLessons);
      setLessonDraft(initialLessonDraft);
      setEditingLessonIndex(null);
      
      // Update lessons_count in the courses table
      updateLessonsCount(updatedLessons.length);
    }
  };

  const initialLessonDraft = {
    title: '',
    description: '',
    duration: '',
    type: 'video',
    order: 1,
    content: {} as any,
    videoFile: null as File | null,
    documentFile: null as File | null,
    imageFile: null as File | null,
    videoUrl: '',
    documentUrl: '',
    imageUrl: '',
    videoId: '' as string | null,
  };

  // After any change to the lessons array (add, edit, remove), update lessons_count in the courses table.
  const updateLessonsCount = async (newCount: number) => {
    if (!course?.id) return;
    await supabase.from('courses').update({ lessons_count: newCount }).eq('id', course.id);
  };

  if (loading || !course) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-2 text-gray-600">Loading course...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Edit Course</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Title *</label>
              <Input value={course.title} onChange={e => setCourse({ ...course, title: e.target.value })} required />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Course Cover Image</label>
              <select
                className="w-full border rounded px-2 py-2 mb-2"
                value={course.image || ''}
                onChange={e => setCourse({ ...course, image: e.target.value })}
              >
                <option value=''>Select a cover image...</option>
                {[
                  'course-1.webp',
                  'grow-courses.jpeg',
                  'graemes_exclusives.jpg',
                  'graemes_exclusives.png',
                  'graeme_sait_clips.png',
                  'gold_from_the_vaults.jpeg',
                  // ...add more as needed
                ].map(img => (
                  <option key={img} value={`/how-to-thumbnails-languages/${img}`}>{img}</option>
                ))}
              </select>
              {course.image && (
                <div className="mb-2">
                  <img src={course.image} alt="Course Cover" className="h-32 rounded object-cover border" />
                  <Button variant="outline" size="sm" onClick={() => setCourse({ ...course, image: null })} className="ml-2">Remove</Button>
                </div>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Category *</label>
              <select className="w-full border rounded px-2 py-2" value={course.category} onChange={e => setCourse({ ...course, category: e.target.value })} required>
                <option value="">Select category</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Level *</label>
              <select className="w-full border rounded px-2 py-2" value={course.level} onChange={e => setCourse({ ...course, level: e.target.value })} required>
                <option value="">Select level</option>
                {levels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Type *</label>
              <select className="w-full border rounded px-2 py-2" value={course.type} onChange={e => setCourse({ ...course, type: e.target.value })} required>
                <option value="">Select type</option>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Duration</label>
              <Input value={course.duration || ''} onChange={e => setCourse({ ...course, duration: e.target.value })} placeholder="e.g. 4 hours" />
            </div>
            <div>
              <label className="block font-medium mb-1">Price</label>
              <Input type="number" value={course.price || 0} onChange={e => setCourse({ ...course, price: Number(e.target.value) })} min={0} />
            </div>
            <div>
              <label className="block font-medium mb-1">Language</label>
              <Input value={course.language || ''} onChange={e => setCourse({ ...course, language: e.target.value })} placeholder="English" />
            </div>
            <div>
              <label className="block font-medium mb-1">Last Updated</label>
              <Input type="date" value={course.last_updated ? course.last_updated.split('T')[0] : ''} onChange={e => setCourse({ ...course, last_updated: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Short Description</label>
            <Textarea value={course.description || ''} onChange={e => setCourse({ ...course, description: e.target.value })} rows={2} />
          </div>
          <div>
            <label className="block font-medium mb-1">Long Description</label>
            <Textarea value={course.long_description || ''} onChange={e => setCourse({ ...course, long_description: e.target.value })} rows={4} />
          </div>
          <div>
            <label className="block font-medium mb-1">Tags (comma separated)</label>
            <Input value={tags.join(', ')} onChange={e => setTags(e.target.value.split(',').map(t => t.trim()))} />
          </div>
          <div>
            <label className="block font-medium mb-1">Learning Objectives</label>
            {learningObjectives.map((obj, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input value={obj} onChange={e => {
                  const arr = [...learningObjectives];
                  arr[idx] = e.target.value;
                  setLearningObjectives(arr);
                }} />
                <Button variant="outline" onClick={() => setLearningObjectives(learningObjectives.filter((_, i) => i !== idx))}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={() => setLearningObjectives([...learningObjectives, ''])}>
              <Plus className="h-4 w-4 mr-1" /> Add Objective
            </Button>
          </div>
          <div>
            <label className="block font-medium mb-1">Prerequisites</label>
            {prerequisites.map((pre, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input value={pre} onChange={e => {
                  const arr = [...prerequisites];
                  arr[idx] = e.target.value;
                  setPrerequisites(arr);
                }} />
                <Button variant="outline" onClick={() => setPrerequisites(prerequisites.filter((_, i) => i !== idx))}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={() => setPrerequisites([...prerequisites, ''])}>
              <Plus className="h-4 w-4 mr-1" /> Add Prerequisite
            </Button>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Instructor</h3>
            <div className="flex items-center justify-between mb-4">
              <label className="block font-medium mb-1">Select Instructor *</label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowInstructorForm(true)}
                className="text-green-600 hover:text-green-700"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Add New Instructor
              </Button>
            </div>
            <select
              className="w-full border rounded px-2 py-2 mb-2"
              value={selectedInstructorId}
              onChange={e => setSelectedInstructorId(e.target.value)}
              required
            >
              <option value="">Select instructor</option>
              {instructors.map(i => (
                <option key={i.id} value={i.id}>{i.name} {i.title ? `- ${i.title}` : ''}</option>
              ))}
            </select>
          </div>

          {/* Instructor Management Modal */}
          {showInstructorForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Add New Instructor</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-1">Name *</label>
                      <Input value={newInstructor.name} onChange={e => setNewInstructor({ ...newInstructor, name: e.target.value })} required />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Title</label>
                      <Input value={newInstructor.title} onChange={e => setNewInstructor({ ...newInstructor, title: e.target.value })} />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Email</label>
                      <Input type="email" value={newInstructor.email} onChange={e => setNewInstructor({ ...newInstructor, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Website</label>
                      <Input value={newInstructor.website} onChange={e => setNewInstructor({ ...newInstructor, website: e.target.value })} />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Location</label>
                      <Input value={newInstructor.location} onChange={e => setNewInstructor({ ...newInstructor, location: e.target.value })} />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Experience</label>
                      <Input value={newInstructor.experience} onChange={e => setNewInstructor({ ...newInstructor, experience: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Bio</label>
                    <Textarea value={newInstructor.bio} onChange={e => setNewInstructor({ ...newInstructor, bio: e.target.value })} rows={3} />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Specializations</label>
                    {newInstructor.specializations.map((spec, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <Input value={spec} onChange={e => {
                          const arr = [...newInstructor.specializations];
                          arr[idx] = e.target.value;
                          setNewInstructor({ ...newInstructor, specializations: arr });
                        }} />
                        <Button variant="outline" onClick={() => setNewInstructor({ ...newInstructor, specializations: newInstructor.specializations.filter((_, i) => i !== idx) })}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="secondary" onClick={() => setNewInstructor({ ...newInstructor, specializations: [...newInstructor.specializations, ''] })}>
                      <Plus className="h-4 w-4 mr-1" /> Add Specialization
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setShowInstructorForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateInstructor} className="bg-green-600 hover:bg-green-700">
                    Create Instructor
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Lessons</h3>
            {lessons.length > 0 && lessons.map((lesson, idx) => {
              const Icon = lessonTypes.find(t => t.value === lesson.type)?.icon || BookOpen;
              return (
                <div key={idx} className="flex items-center gap-2 mb-2 p-2 border rounded">
                  <Icon className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{lesson.title}</span>
                  <span className="text-xs text-gray-500">({lesson.type})</span>
                  {lesson.content?.videoUrl && <VideoIcon className="h-4 w-4 text-blue-500" />}
                  {lesson.content?.documentUrl && <FileText className="h-4 w-4 text-purple-500" />}
                  {lesson.content?.imageUrl && <Image className="h-4 w-4 text-green-500" />}
                  <Button variant="outline" size="sm" onClick={() => {
                    setLessonDraft({ ...lesson });
                    setEditingLessonIndex(idx);
                  }}><Edit className="h-4 w-4" /></Button>
                  <Button variant="outline" size="sm" onClick={() => handleRemoveLesson(idx)}><Trash className="h-4 w-4" /></Button>
                </div>
              );
            })}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input placeholder="Lesson Title" value={lessonDraft.title} onChange={e => setLessonDraft({ ...lessonDraft, title: e.target.value })} />
              <Input placeholder="Duration (e.g. 20 min)" value={lessonDraft.duration} onChange={e => setLessonDraft({ ...lessonDraft, duration: e.target.value })} />
              <select className="w-full border rounded px-2 py-2" value={lessonDraft.type} onChange={e => setLessonDraft({ ...lessonDraft, type: e.target.value })}>
                {lessonTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <Input placeholder="Order" type="number" value={lessonDraft.order} onChange={e => setLessonDraft({ ...lessonDraft, order: Number(e.target.value) })} min={1} />
            </div>
            <div className="mt-2">
              <Textarea placeholder="Lesson Description" value={lessonDraft.description} onChange={e => setLessonDraft({ ...lessonDraft, description: e.target.value })} rows={2} />
            </div>
            
            {/* File Upload Section */}
            <div className="mt-4 space-y-4">
              <h4 className="font-medium text-sm text-gray-700">Lesson Content</h4>
              
              {/* Video Upload */}
              {lessonDraft.type === 'video' && (
                <div className="space-y-2 mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    <VideoIcon className="inline h-4 w-4 mr-1" />
                    Video URL
                  </label>
                  <Input
                    placeholder="Paste direct video URL (e.g. /videos/my-course/my-video.mp4 or Google Drive preview link)"
                    value={lessonDraft.videoUrl}
                    onChange={e => setLessonDraft({ ...lessonDraft, videoUrl: e.target.value })}
                  />
                </div>
              )}
              
              {/* Reading Content for Reading Lessons */}
              {lessonDraft.type === 'reading' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <FileText className="inline h-4 w-4 mr-1" />
                    Reading Content
                  </label>
                  <Textarea
                    placeholder="Enter the reading content for this lesson..."
                    value={lessonDraft.content?.readingContent || ''}
                    onChange={(e) => setLessonDraft({ 
                      ...lessonDraft, 
                      content: { ...lessonDraft.content, readingContent: e.target.value }
                    })}
                    rows={8}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">
                    Enter the text content that will be displayed to students. You can also upload a document file below as an alternative.
                  </p>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      <FileText className="inline h-4 w-4 mr-1" />
                      Document File (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={(e) => setLessonDraft({ 
                          ...lessonDraft, 
                          documentFile: e.target.files?.[0] || null 
                        })}
                        className="flex-1"
                      />
                      {lessonDraft.documentFile && (
                        <span className="text-sm text-green-600">
                          ✓ {lessonDraft.documentFile.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Image Upload (for any lesson type) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <Image className="inline h-4 w-4 mr-1" />
                  Cover Image (Optional)
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLessonDraft({ 
                      ...lessonDraft, 
                      imageFile: e.target.files?.[0] || null 
                    })}
                    className="flex-1"
                  />
                  {lessonDraft.imageFile && (
                    <span className="text-sm text-green-600">
                      ✓ {lessonDraft.imageFile.name}
                    </span>
                  )}
                </div>
              </div>
              
              {/* External URL inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lessonDraft.type === 'video' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Document URL (Alternative)
                    </label>
                    <Input
                      placeholder="Direct link to document"
                      value={lessonDraft.documentUrl}
                      onChange={(e) => setLessonDraft({ ...lessonDraft, documentUrl: e.target.value })}
                    />
                  </div>
                )}
              </div>
            </div>
            
            {editingLessonIndex !== null && (
              <Button onClick={() => {
                setLessonDraft(initialLessonDraft);
                setEditingLessonIndex(null);
              }} className="mt-4">
                Cancel
              </Button>
            )}
          </div>
          <Separator />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate('/app/education/online-learning/course-management')}>
              Cancel
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700" 
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700" 
              onClick={handleSaveAndStay}
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save & Stay
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 