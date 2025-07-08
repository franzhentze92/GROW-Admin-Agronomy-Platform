import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  BookOpen,
  MessageCircle,
  Download,
  CheckCircle,
  Circle,
  Clock,
  Target,
  Award,
  FileText,
  Video,
  ChevronLeft,
  ChevronRight,
  Star,
  Share2,
  Bookmark,
  Lightbulb,
  Users,
  Calendar,
  AlertTriangle,
  Loader2,
  Lock,
  Home
} from 'lucide-react';
import { lessonApi, lessonProgressApi, courseApi } from '@/lib/educationApi';
import type { Lesson, Course } from '@/lib/educationApi';
import { supabase } from '@/lib/supabaseClient';
import ReactMarkdown from 'react-markdown';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface AssignmentDetails {
  title: string;
  description: string;
  requirements: string[];
  dueDate?: string;
  submissionType: 'text' | 'file' | 'both';
}

interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
  size?: string;
}

const getProgressKey = (courseId: string) => `course-progress-${courseId}`;

// Helper to get icon for lesson type
const getLessonIcon = (type: string) => {
  switch (type) {
    case 'video': return Play;
    case 'reading': return BookOpen;
    case 'quiz': return Target;
    case 'assignment': return Award;
    default: return BookOpen;
  }
};

function extractGoogleDriveFileId(url: string | undefined) {
  if (!url) return null;
  const match = url.match(/(?:id=|file\/d\/)([a-zA-Z0-9_-]{10,})/);
  return match ? match[1] : null;
}

const LessonPage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lessonProgress, setLessonProgress] = useState<{
    is_completed: boolean;
    completed_at?: string;
    quiz_score?: number;
    notes?: string;
  } | null>(null);
  const [courseProgress, setCourseProgress] = useState<{
    completedLessons: number;
    totalLessons: number;
    progressPercentage: number;
    lessonProgress: { [lessonId: string]: boolean };
  } | null>(null);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [notes, setNotes] = useState('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPaused, setIsPaused] = useState(true);

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    fetchUser();
  }, []);

  const loadProgressFromStorage = (userId: string, courseId: string) => {
    try {
      const storageKey = `lesson-progress-${userId}-${courseId}`;
      const storedProgress = JSON.parse(localStorage.getItem(storageKey) || '{}');
      
      // Convert stored progress to the expected format
      const lessonProgress: { [lessonId: string]: boolean } = {};
      let completedLessons = 0;
      
      Object.keys(storedProgress).forEach(lessonId => {
        if (storedProgress[lessonId].is_completed) {
          lessonProgress[lessonId] = true;
          completedLessons++;
        }
      });
      
      return {
        completedLessons,
        totalLessons: allLessons.length,
        progressPercentage: allLessons.length > 0 ? (completedLessons / allLessons.length) * 100 : 0,
        lessonProgress
      };
    } catch (error) {
      console.error('Error loading progress from storage:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchLessonData = async () => {
      if (!lessonId || !courseId || !user?.id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching lesson data for:', { courseId, lessonId });
        
        // Fetch course and lessons first (these should work)
        const [courseData, lessonsData, lesson] = await Promise.all([
          courseApi.getCourseById(courseId),
          lessonApi.getLessonsByCourseId(courseId),
          lessonApi.getLessonById(lessonId)
        ]);
        
        setCourse(courseData);
        setAllLessons(lessonsData);
        setCurrentLesson(lesson);
        
        // Try to fetch progress data, but don't fail if it doesn't work
        try {
          const [progress, courseProgressData] = await Promise.all([
            lessonProgressApi.getLessonProgress(user?.id, lessonId),
            lessonProgressApi.getCourseProgress(user?.id, courseId)
          ]);
          
          console.log('Progress data fetched:', { progress, courseProgress: courseProgressData });
          
          setLessonProgress(progress);
          
          // Use database progress if available, otherwise fall back to local storage
          if (courseProgressData && courseProgressData.totalLessons > 0) {
            setCourseProgress(courseProgressData);
          } else {
            const storageProgress = loadProgressFromStorage(user?.id, courseId);
            if (storageProgress) {
              setCourseProgress(storageProgress);
            }
          }
          
          // Set notes if they exist
          if (progress?.notes) {
            setNotes(progress.notes);
          }
        } catch (progressError) {
          console.warn('Progress data fetch failed, using local storage:', progressError);
          
          // Fall back to local storage for progress
          const storageProgress = loadProgressFromStorage(user?.id, courseId);
          if (storageProgress) {
            setCourseProgress(storageProgress);
          }
          
          // Try to get lesson progress from local storage
          const storageKey = `lesson-progress-${user?.id}-${courseId}`;
          const storedProgress = JSON.parse(localStorage.getItem(storageKey) || '{}');
          const lessonProgress = storedProgress[lessonId];
          if (lessonProgress) {
            setLessonProgress(lessonProgress);
            if (lessonProgress.notes) {
              setNotes(lessonProgress.notes);
            }
          }
        }
        
        console.log('Fetched data:', { 
          course: courseData, 
          lessons: lessonsData, 
          lesson, 
          courseProgress: courseProgress 
        });
        
      } catch (err) {
        console.error('Error fetching lesson data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load lesson data');
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [lessonId, courseId, user?.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handlePlay = () => setIsPaused(false);
      const handlePause = () => setIsPaused(true);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, [currentLesson?.video_url]);

  const handleMarkComplete = async () => {
    if (!lessonId || !courseId || !user?.id) return;
    
    try {
      setMarkingComplete(true);
      console.log('Marking lesson as complete:', { courseId, lessonId, notes });
      
      // Always save to local storage first
      const storageKey = `lesson-progress-${user?.id}-${courseId}`;
      const existingProgress = JSON.parse(localStorage.getItem(storageKey) || '{}');
      existingProgress[lessonId] = {
        is_completed: true,
        completed_at: new Date().toISOString(),
        notes: notes
      };
      localStorage.setItem(storageKey, JSON.stringify(existingProgress));
      
      // Update local state immediately
      setLessonProgress({
        is_completed: true,
        completed_at: new Date().toISOString(),
        notes: notes
      });
      
      // Try to save to database (but don't fail if it doesn't work)
      try {
        await lessonProgressApi.markLessonComplete(user?.id, courseId, lessonId, undefined, notes);
        console.log('Progress saved to database successfully');
      } catch (dbError) {
        console.warn('Database save failed, using local storage only:', dbError);
      }
      
      // Update course progress from local storage
      const storageProgress = loadProgressFromStorage(user?.id, courseId);
      if (storageProgress) {
        setCourseProgress(storageProgress);
      }
      
      // Re-fetch lesson progress for this lesson
      const progress = await lessonProgressApi.getLessonProgress(user?.id, lessonId);
      setLessonProgress(progress);
      
      // Re-fetch course progress so sidebar updates automatically
      const courseProgressData = await lessonProgressApi.getCourseProgress(user?.id, courseId);
      setCourseProgress(courseProgressData);
      
      console.log('Lesson marked as complete successfully');
      
    } catch (err) {
      console.error('Error marking lesson complete:', err);
      alert('Failed to mark lesson as complete. Please try again.');
    } finally {
      setMarkingComplete(false);
    }
  };

  const getCurrentLessonIndex = () => {
    return allLessons.findIndex(lesson => lesson.id === lessonId);
  };

  const getNextLesson = () => {
    const currentIndex = getCurrentLessonIndex();
    if (currentIndex < allLessons.length - 1) {
      return allLessons[currentIndex + 1];
    }
    return null;
  };

  const getPreviousLesson = () => {
    const currentIndex = getCurrentLessonIndex();
    if (currentIndex > 0) {
      return allLessons[currentIndex - 1];
    }
    return null;
  };

  const navigateToLesson = (lessonId: string) => {
    console.log('Navigating to lesson:', lessonId);
    navigate(`/app/education/online-learning/courses/${courseId}/lessons/${lessonId}`);
  };

  const isLessonLocked = (lesson: Lesson) => {
    if (!lesson.is_locked) return false;
    
    // Check if previous lesson is completed
    const lessonIndex = allLessons.findIndex(l => l.id === lesson.id);
    if (lessonIndex === 0) return false; // First lesson is never locked
    
    const previousLesson = allLessons[lessonIndex - 1];
    return !courseProgress?.lessonProgress?.[previousLesson.id];
  };

  console.log('DEBUG currentLesson:', currentLesson);
  console.log('DEBUG currentLesson.content:', currentLesson?.content);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#8cb33a]" />
            <p className="text-gray-600">Loading lesson...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentLesson) {
    return (
      <div className="container mx-auto px-6 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Lesson not found</h3>
            <p className="text-gray-600 mb-4">{error || 'The lesson you are looking for does not exist.'}</p>
            <Button onClick={() => navigate(-1)}>Back</Button>
          </div>
        </div>
      </div>
    );
  }

  const nextLesson = getNextLesson();
  const previousLesson = getPreviousLesson();
  const currentIndex = getCurrentLessonIndex();

  console.log('Current lesson state:', {
    currentLesson,
    lessonProgress,
    courseProgress,
    nextLesson,
    previousLesson,
    currentIndex,
    allLessons: allLessons.length
  });

  const videoUrl = currentLesson.video_url || currentLesson.content?.video_url || currentLesson.content?.videoUrl;
  const googleDriveFileId = extractGoogleDriveFileId(videoUrl);
  const isGoogleDrive = !!googleDriveFileId;

  // Render lesson content
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/app/education/online-learning/courses/${courseId}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => navigate('/app/education/online-learning/courses')}
        >
          <Home className="mr-2 h-4 w-4" />
          All Courses
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Course Progress Bar */}
          {courseProgress && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Course Progress</span>
                  <span className="text-sm text-gray-600">
                    {courseProgress.completedLessons} of {courseProgress.totalLessons} lessons completed
                  </span>
                </div>
                <Progress value={courseProgress.progressPercentage} className="h-2" />
                <p className="text-sm text-gray-600 mt-1">
                  {Math.round(courseProgress.progressPercentage)}% complete
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold mb-2">{currentLesson.title}</CardTitle>
                  <CardDescription className="mb-2">{currentLesson.description}</CardDescription>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Clock className="h-4 w-4" />
                    <span>{currentLesson.duration}</span>
                    <Badge variant="outline" className="ml-2">{currentLesson.type}</Badge>
                    {lessonProgress?.is_completed && (
                      <Badge variant="default" className="bg-[#8cb33a]">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Render lesson content by type */}
              {currentLesson.type === 'video' && (
                <div className="mb-6">
                  <div className="relative group">
                    {isGoogleDrive ? (
                      <iframe
                        src={`https://drive.google.com/file/d/${googleDriveFileId}/preview`}
                        title={currentLesson.title}
                        className="w-full aspect-video"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                      />
                    ) : (
                      <video
                        ref={videoRef}
                        id="lesson-video-player"
                        controls
                        className="w-full h-auto max-h-[600px]"
                        preload="metadata"
                        style={{ background: '#222' }}
                      >
                        <source src={videoUrl} type="video/mp4" />
                        <source src={videoUrl?.replace('.mp4', '.webm')} type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                  
                  {/* Video Controls and Info */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Video Information</h4>
                        <p className="text-sm text-gray-600">
                          Duration: {currentLesson.duration} | Format: MP4
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // Open video in fullscreen
                            const video = document.querySelector('video') as HTMLVideoElement;
                            if (video) {
                              if (video.requestFullscreen) {
                                video.requestFullscreen();
                              } else if ((video as any).webkitRequestFullscreen) {
                                (video as any).webkitRequestFullscreen();
                              } else if ((video as any).msRequestFullscreen) {
                                (video as any).msRequestFullscreen();
                              }
                            }
                          }}
                        >
                          <Maximize className="h-4 w-4 mr-1" />
                          Fullscreen
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {currentLesson.type === 'reading' && (
                <div className="max-w-none mb-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    {currentLesson.content?.readingContent ? (
                      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-justify markdown-tight">
                        <ReactMarkdown>{currentLesson.content.readingContent}</ReactMarkdown>
                      </div>
                    ) : (
                      <div className="text-gray-500 italic">
                        <p>No reading content has been added to this lesson yet.</p>
                        <p className="mt-2 text-sm">
                          Please contact the course administrator to add content to this lesson.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {currentLesson.type === 'quiz' && (
                <div className="mb-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Quiz</h3>
                    <p className="text-blue-700">Quiz functionality is coming soon. You'll be able to test your knowledge with interactive questions.</p>
                  </div>
                </div>
              )}

              {currentLesson.type === 'assignment' && (
                <div className="mb-6">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Assignment</h3>
                    <p className="text-purple-700">Assignment functionality is coming soon. You'll be able to complete and submit assignments here.</p>
                  </div>
                </div>
              )}

              {/* Mark as Complete Button */}
              {!lessonProgress?.is_completed && (
                <div className="flex justify-center mb-6">
                  <Button
                    onClick={handleMarkComplete}
                    disabled={markingComplete}
                    className="bg-[#8cb33a] hover:bg-[#729428]"
                    size="lg"
                  >
                    {markingComplete ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Marking Complete...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Complete
                      </>
                    )}
                  </Button>
                </div>
              )}

              {lessonProgress?.is_completed && (
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 text-[#8cb33a] mb-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Lesson completed!</span>
                  </div>
                  {lessonProgress.completed_at && (
                    <p className="text-sm text-gray-600">
                      Completed on {new Date(lessonProgress.completed_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => previousLesson && navigateToLesson(previousLesson.id)}
                  disabled={!previousLesson}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Lesson
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => nextLesson && navigateToLesson(nextLesson.id)}
                  disabled={!nextLesson}
                  className="flex items-center gap-2"
                >
                  Next Lesson
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lesson List Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Lessons</CardTitle>
                <CardDescription>
                  {courseProgress?.completedLessons || 0} of {allLessons.length} completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {allLessons.map((lesson, index) => {
                    const isCurrent = lesson.id === lessonId;
                    // Ensure both IDs are strings for robust comparison
                    const isCompleted = !!courseProgress?.lessonProgress?.[String(lesson.id)];
                    const isLocked = isLessonLocked(lesson);
                    const LessonIcon = getLessonIcon(lesson.type);
                    
                    return (
                      <div
                        key={lesson.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          isCurrent
                            ? 'bg-[#8cb33a] text-white'
                            : isLocked
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : isCompleted
                            ? 'bg-[#eaf5d3] text-[#8cb33a] hover:bg-[#d4e8b8]'
                            : 'bg-white border border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => !isLocked && navigateToLesson(lesson.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {isCompleted ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : isLocked ? (
                              <Lock className="h-4 w-4" />
                            ) : (
                              <LessonIcon className="h-4 w-4" />
                            )}
                            <span className="text-sm font-medium">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${
                              isCurrent ? 'text-white' : 'text-gray-900'
                            }`}>
                              {lesson.title}
                            </p>
                            <p className={`text-xs truncate ${
                              isCurrent ? 'text-white/80' : 'text-gray-500'
                            }`}>
                              {lesson.duration}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage; 