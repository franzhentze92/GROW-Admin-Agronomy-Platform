import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash, BookOpen, Play, Target, Award, Loader2, Save, Upload, FileText, Video, Image, UserPlus, Settings, Edit } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/hooks/use-toast';
import processedVideosData from '../../processed-videos.json';

const lessonTypes = [
  { value: 'video', label: 'Video', icon: Play },
  { value: 'reading', label: 'Reading', icon: BookOpen },
  { value: 'quiz', label: 'Quiz', icon: Target },
  { value: 'assignment', label: 'Assignment', icon: Award },
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];
const types = ['Theory', 'Practice', 'Mixed'];
const categories = [
  'Soil Health', 'Plant Health', 'Human Health', 'Animal Health', 'Planetary Health',
  'Crop Protection', 'Sustainable Practices', 'Technology', 'Business & Marketing', 'Innovation'
];

// 1. List of available cover images:
const coverImageOptions = [
  'course-1.webp',
  'grow-courses.jpeg',
  'graemes_exclusives.jpg',
  'graemes_exclusives.png',
  'graeme_sait_clips.png',
  'gold_from_the_vaults.jpeg',
  // ...add more as needed
];

export default function CourseCreatePage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState<string>('');
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

  useEffect(() => {
    // Fetch instructors from Supabase
    const fetchInstructors = async () => {
      const { data, error } = await supabase
        .from('instructors')
        .select('*')
        .order('name', { ascending: true });
      if (!error && data) {
        setInstructors(data);
      }
    };
    fetchInstructors();

    // Load and filter videos from processed-videos.json
    const growVideos = processedVideosData.videos.filter(v => v.series === 'G.R.O.W Courses');
    setGrowCourseVideos(growVideos);
  }, []);

  const [course, setCourse] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: '',
    duration: '',
    level: '',
    instructor: {
      id: '', name: '', title: '', bio: '', avatar: '', email: '', website: '', location: '', experience: '', specializations: ['']
    },
    price: 0,
    type: '',
    tags: [''],
    learningObjectives: [''],
    prerequisites: [''],
    language: 'English',
    lastUpdated: new Date().toISOString().split('T')[0],
    lessonsList: [],
    image: null,
  });

  // When instructor is selected, update course.instructor
  useEffect(() => {
    if (selectedInstructorId) {
      const found = instructors.find(i => i.id === selectedInstructorId);
      if (found) {
        setCourse(c => ({ ...c, instructor: found }));
      }
    }
  }, [selectedInstructorId, instructors]);

  const [lessonDraft, setLessonDraft] = useState({
    title: '', description: '', duration: '', type: 'video', order: 1, content: {} as any,
    videoFile: null as File | null,
    documentFile: null as File | null,
    imageFile: null as File | null,
    videoUrl: '',
    documentUrl: '',
    imageUrl: '',
    videoId: '' as string | null,
  });

  const [editingLessonIndex, setEditingLessonIndex] = useState<number | null>(null);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [lessonLoadingMessage, setLessonLoadingMessage] = useState('');

  const handleAddLesson = async () => {
    if (!lessonDraft.title.trim()) {
      toast({ title: "Error", description: "Lesson title is required", variant: "destructive" });
      return;
    }
    setLessonLoading(true);
    setLessonLoadingMessage('Uploading lesson, please wait...');
    try {
      let content: any = { ...lessonDraft.content };
      
      // Handle file uploads based on lesson type
      if (lessonDraft.type === 'video' && lessonDraft.videoFile) {
        setLessonLoadingMessage('Uploading video file. This may take a while for large files...');
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
      
      // If a video is selected from the dropdown, use its URL
      if (lessonDraft.type === 'video' && lessonDraft.videoId) {
        const selectedVideo = growCourseVideos.find(v => v.id === lessonDraft.videoId);
        if (selectedVideo) {
          content.videoUrl = selectedVideo.preview_link;
          content.videoId = selectedVideo.id;
          content.videoTitle = selectedVideo.title;
          content.thumbnail_url = selectedVideo.thumbnail_url;
        }
      }
      
      const newLesson = {
        ...lessonDraft,
        order: course.lessonsList.length + 1,
        content: content,
        videoUrl: lessonDraft.videoUrl
      };
      
      let updatedLessonsList;
      if (editingLessonIndex !== null) {
        updatedLessonsList = [...course.lessonsList];
        updatedLessonsList[editingLessonIndex] = newLesson;
      } else {
        updatedLessonsList = [...course.lessonsList, newLesson];
      }
      setCourse({ ...course, lessonsList: updatedLessonsList });
      setLessonDraft({ title: '', description: '', duration: '', type: 'video', order: updatedLessonsList.length + 1, content: {}, videoFile: null, documentFile: null, imageFile: null, videoUrl: '', documentUrl: '', imageUrl: '', videoId: '' });
      setEditingLessonIndex(null);
      
      toast({
        title: "Success",
        description: "Lesson added successfully!",
      });

      updateLessonsCount(updatedLessonsList.length);
    } catch (error) {
      console.error('Error adding lesson:', error);
      toast({
        title: "Error",
        description: "Failed to add lesson",
        variant: "destructive",
      });
    } finally {
      setLessonLoading(false);
      setLessonLoadingMessage('');
    }
  };

  const handleEditLesson = (idx: number) => {
    setLessonDraft({ ...course.lessonsList[idx] });
    setEditingLessonIndex(idx);

    updateLessonsCount(course.lessonsList.length);
  };

  const handleCancelEditLesson = () => {
    setLessonDraft({ title: '', description: '', duration: '', type: 'video', order: course.lessonsList.length + 1, content: {}, videoFile: null, documentFile: null, imageFile: null, videoUrl: '', documentUrl: '', imageUrl: '', videoId: '' });
    setEditingLessonIndex(null);

    updateLessonsCount(course.lessonsList.length);
  };

  const handleRemoveLesson = (idx: number) => {
    const updatedLessonsList = course.lessonsList.filter((_, i) => i !== idx);
    setCourse({ ...course, lessonsList: updatedLessonsList });
    if (editingLessonIndex === idx) handleCancelEditLesson();

    updateLessonsCount(updatedLessonsList.length);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSave = async () => {
    // Validation
    if (!course.title.trim()) {
      toast({
        title: "Error",
        description: "Course title is required",
        variant: "destructive",
      });
      return;
    }

    if (!course.category) {
      toast({
        title: "Error",
        description: "Course category is required",
        variant: "destructive",
      });
      return;
    }

    if (!course.level) {
      toast({
        title: "Error",
        description: "Course level is required",
        variant: "destructive",
      });
      return;
    }

    if (!course.type) {
      toast({
        title: "Error",
        description: "Course type is required",
        variant: "destructive",
      });
      return;
    }

    if (!selectedInstructorId) {
      toast({
        title: "Error",
        description: "Instructor is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);

      // 1. Generate a unique slug
      let baseSlug = generateSlug(course.title);
      let slug = baseSlug;
      let count = 1;
      let { data: existing, error: checkError } = await supabase
        .from('courses')
        .select('id')
        .eq('slug', slug);
      while (existing && existing.length > 0) {
        slug = `${baseSlug}-${count++}`;
        ({ data: existing, error: checkError } = await supabase
          .from('courses')
          .select('id')
          .eq('slug', slug));
      }

      // 2. Create course first
      const { data: newCourse, error: courseError } = await supabase
        .from('courses')
        .insert({
          slug: slug,
          title: course.title,
          description: course.description,
          long_description: course.longDescription,
          category: course.category,
          duration: course.duration,
          level: course.level,
          price: course.price,
          type: course.type,
          language: course.language,
          last_updated: new Date().toISOString(),
          instructor_id: selectedInstructorId,
          lessons: course.lessonsList.length,
          status: 'draft',
          image: course.image
        })
        .select('id')
        .single();

      if (courseError) {
        console.error('Course creation error:', courseError);
        throw courseError;
      }

      console.log('Course created successfully with ID:', newCourse.id);
      const courseId = newCourse.id;

      // 2. Create tags (only if table exists)
      if (course.tags.length > 0 && course.tags[0].trim()) {
        try {
          const tagsToInsert = course.tags
            .filter(tag => tag.trim())
            .map(tag => ({ course_id: courseId, tag: tag.trim() }));

          if (tagsToInsert.length > 0) {
            const { error: tagsError } = await supabase
              .from('course_tags')
              .insert(tagsToInsert);

            if (tagsError) {
              console.warn('Tags creation failed:', tagsError);
              // Continue without tags
            }
          }
        } catch (error) {
          console.warn('Tags table might not exist:', error);
        }
      }

      // 3. Create learning objectives (only if table exists)
      if (course.learningObjectives.length > 0 && course.learningObjectives[0].trim()) {
        try {
          const objectivesToInsert = course.learningObjectives
            .filter(obj => obj.trim())
            .map(obj => ({ course_id: courseId, objective: obj.trim() }));

          if (objectivesToInsert.length > 0) {
            const { error: objectivesError } = await supabase
              .from('course_learning_objectives')
              .insert(objectivesToInsert);

            if (objectivesError) {
              console.warn('Objectives creation failed:', objectivesError);
              // Continue without objectives
            }
          }
        } catch (error) {
          console.warn('Learning objectives table might not exist:', error);
        }
      }

      // 4. Create prerequisites (only if table exists)
      if (course.prerequisites.length > 0 && course.prerequisites[0].trim()) {
        try {
          const prerequisitesToInsert = course.prerequisites
            .filter(pre => pre.trim())
            .map(pre => ({ course_id: courseId, prerequisite: pre.trim() }));

          if (prerequisitesToInsert.length > 0) {
            const { error: prerequisitesError } = await supabase
              .from('course_prerequisites')
              .insert(prerequisitesToInsert);

            if (prerequisitesError) {
              console.warn('Prerequisites creation failed:', prerequisitesError);
              // Continue without prerequisites
            }
          }
        } catch (error) {
          console.warn('Prerequisites table might not exist:', error);
        }
      }

      // 5. Create lessons (only if table exists)
      if (course.lessonsList.length > 0) {
        try {
          const lessonsToInsert = course.lessonsList.map(lesson => ({
            course_id: courseId,
            title: lesson.title,
            content: lesson.content,
            order_index: lesson.order,
            duration: lesson.duration,
            type: lesson.type,
            video_url: lesson.videoUrl
          }));

          const { error: lessonsError } = await supabase
            .from('lessons')
            .insert(lessonsToInsert);

          if (lessonsError) {
            console.warn('Lessons creation failed:', lessonsError);
            // Continue without lessons
          }
        } catch (error) {
          console.warn('Lessons table might not exist:', error);
        }
      }

      let imageUrl = course.image;
      if (course.image) {
        imageUrl = course.image;
      }

      const { error: courseUpdateError } = await supabase
        .from('courses')
        .update({
          title: course.title,
          description: course.description,
          long_description: course.longDescription,
          category: course.category,
          duration: course.duration,
          level: course.level,
          price: course.price,
          type: course.type,
          language: course.language,
          last_updated: new Date().toISOString(),
          instructor_id: selectedInstructorId,
          lessons: course.lessonsList.length,
          status: 'draft',
          image: imageUrl
        })
        .eq('id', courseId);

      if (courseUpdateError) {
        console.error('Course update error:', courseUpdateError);
        throw courseUpdateError;
      }

      toast({
        title: "Success",
        description: "Course created successfully!",
      });

      // Navigate to the course management page
      navigate('/app/education/online-learning/course-management');

      updateLessonsCount(course.lessonsList.length);

    } catch (error: any) {
      console.error('Error creating course:', error);
      toast({
        title: "Error",
        description: error?.message || JSON.stringify(error) || "Failed to create course",
        variant: "destructive",
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

  const updateLessonsCount = async (newCount: number) => {
    if (!course?.id) return;
    await supabase.from('courses').update({ lessons_count: newCount }).eq('id', course.id);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Course</CardTitle>
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
              <Input value={course.duration} onChange={e => setCourse({ ...course, duration: e.target.value })} placeholder="e.g. 4 hours" />
            </div>
            <div>
              <label className="block font-medium mb-1">Price ($)</label>
              <Input type="number" value={course.price} onChange={e => setCourse({ ...course, price: Number(e.target.value) })} min={0} />
            </div>
            <div>
              <label className="block font-medium mb-1">Language</label>
              <Input value={course.language} onChange={e => setCourse({ ...course, language: e.target.value })} placeholder="English" />
            </div>
            <div>
              <label className="block font-medium mb-1">Last Updated</label>
              <Input type="date" value={course.lastUpdated} onChange={e => setCourse({ ...course, lastUpdated: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Short Description</label>
            <Textarea value={course.description} onChange={e => setCourse({ ...course, description: e.target.value })} rows={2} />
          </div>
          <div>
            <label className="block font-medium mb-1">Long Description</label>
            <Textarea value={course.longDescription} onChange={e => setCourse({ ...course, longDescription: e.target.value })} rows={4} />
          </div>
          <div>
            <label className="block font-medium mb-1">Tags (comma separated)</label>
            <Input value={course.tags.join(', ')} onChange={e => setCourse({ ...course, tags: e.target.value.split(',').map(t => t.trim()) })} />
          </div>
          <div>
            <label className="block font-medium mb-1">Learning Objectives</label>
            {course.learningObjectives.map((obj, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input value={obj} onChange={e => {
                  const arr = [...course.learningObjectives];
                  arr[idx] = e.target.value;
                  setCourse({ ...course, learningObjectives: arr });
                }} />
                <Button variant="outline" onClick={() => setCourse({ ...course, learningObjectives: course.learningObjectives.filter((_, i) => i !== idx) })}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={() => setCourse({ ...course, learningObjectives: [...course.learningObjectives, ''] })}>
              <Plus className="h-4 w-4 mr-1" /> Add Objective
            </Button>
          </div>
          <div>
            <label className="block font-medium mb-1">Prerequisites</label>
            {course.prerequisites.map((pre, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input value={pre} onChange={e => {
                  const arr = [...course.prerequisites];
                  arr[idx] = e.target.value;
                  setCourse({ ...course, prerequisites: arr });
                }} />
                <Button variant="outline" onClick={() => setCourse({ ...course, prerequisites: course.prerequisites.filter((_, i) => i !== idx) })}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={() => setCourse({ ...course, prerequisites: [...course.prerequisites, ''] })}>
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
            {selectedInstructorId && course.instructor && (
              <div className="bg-gray-50 p-3 rounded border text-sm mb-2">
                <div><b>Name:</b> {course.instructor.name}</div>
                {course.instructor.title && <div><b>Title:</b> {course.instructor.title}</div>}
                {course.instructor.email && <div><b>Email:</b> {course.instructor.email}</div>}
                {course.instructor.bio && <div><b>Bio:</b> {course.instructor.bio}</div>}
                {course.instructor.location && <div><b>Location:</b> {course.instructor.location}</div>}
                {course.instructor.experience && <div><b>Experience:</b> {course.instructor.experience}</div>}
                {course.instructor.specializations && course.instructor.specializations.length > 0 && <div><b>Specializations:</b> {course.instructor.specializations.join(', ')}</div>}
              </div>
            )}
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
            {course.lessonsList.length > 0 && course.lessonsList.map((lesson, idx) => {
              const Icon = lessonTypes.find(t => t.value === lesson.type)?.icon || BookOpen;
              return (
                <div key={idx} className="flex items-center gap-2 mb-2 p-2 border rounded">
                  <Icon className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{lesson.title}</span>
                  <span className="text-xs text-gray-500">({lesson.type})</span>
                  {lesson.content?.videoUrl && <Video className="h-4 w-4 text-blue-500" />}
                  {lesson.content?.documentUrl && <FileText className="h-4 w-4 text-purple-500" />}
                  {lesson.content?.imageUrl && <Image className="h-4 w-4 text-green-500" />}
                  <Button variant="outline" size="sm" onClick={() => handleEditLesson(idx)}><Edit className="h-4 w-4" /></Button>
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
            
            {/* Video URL input for Video Lessons */}
            {lessonDraft.type === 'video' && (
              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  <Video className="inline h-4 w-4 mr-1" />
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
              <div className="space-y-2 mt-4">
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
            
            {/* Image Upload for Any Lesson Type */}
            <div className="space-y-2 mt-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
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
            
            <div className="flex gap-2 mt-4">
              {editingLessonIndex !== null ? (
                <>
                  <Button onClick={handleAddLesson} className="bg-green-600 hover:bg-green-700">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancelEditLesson}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={handleAddLesson} className="bg-green-600 hover:bg-green-700">
                  Add Lesson
                </Button>
              )}
            </div>
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
                  Save Course
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 