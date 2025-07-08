import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, GraduationCap, Mic, Video, HeartPulse, Gamepad2, BookOpen, Users, Star, Clock, Loader2, FlaskConical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { courseApi, educationStatsApi } from '@/lib/educationApi';
import type { Course } from '@/lib/educationApi';
import processedVideosData from '../../public/processed-videos.json';
import { plantHealthData, animalHealthData, soilHealthData, humanHealthData, planetaryHealthData } from '../features/health-index/data/nutrients';
import { questions } from '../../GROW Arcade/growtriviachallenge/src/data/questions';
import VideoLibrarySearch from '@/components/VideoLibrarySearch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// If you have a shared footer component, import it here:
// import PoweredByFooter from '@/components/layout/PoweredByFooter';

const educationalResources = [
  {
    id: 'videos',
    title: 'Videos',
    description: 'Educational videos, tutorials, and demonstrations on various agricultural topics and techniques.',
    icon: Video,
    path: '/app/education/online-learning/videos',
    color: 'bg-red-50 hover:bg-red-100 border-red-200',
    iconColor: 'text-red-600'
  },
  {
    id: 'courses',
    title: 'Courses',
    description: 'Comprehensive online courses covering sustainable agriculture, soil health, and crop management.',
    icon: GraduationCap,
    path: '/app/education/online-learning/courses',
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    iconColor: 'text-blue-600'
  },
  {
    id: 'podcast',
    title: 'Podcast',
    description: 'Expert discussions, interviews, and insights on agricultural best practices and innovations.',
    icon: Mic,
    path: '/app/education/online-learning/podcast',
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
    iconColor: 'text-purple-600'
  },
  {
    id: 'health-index',
    title: 'G.R.O.W Health Index',
    description: 'Monitor and track soil and plant health metrics with our comprehensive health index system.',
    icon: HeartPulse,
    path: '/app/education/health-index',
    color: 'bg-green-50 hover:bg-green-100 border-green-200',
    iconColor: 'text-green-600'
  },
  {
    id: 'arcade',
    title: 'G.R.O.W Arcade',
    description: 'Play the G.R.O.W Trivia Challenge and stay tuned for more educational games coming soon!',
    icon: Gamepad2,
    path: '/app/education/arcade/trivia',
    color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
    iconColor: 'text-orange-600'
  },
  {
    id: 'simulations',
    title: 'Science Simulations',
    description: 'Explore interactive simulations in biology, chemistry, physics, and earth & space to master the foundations of science for agriculture.',
    icon: FlaskConical,
    path: '/app/education/simulations',
    color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200',
    iconColor: 'text-cyan-600'
  },
];

interface EducationStats {
  totalCourses: number;
  totalStudents: number;
  totalLessons: number;
  totalCertificates: number;
  averageRating: number;
}

const GrowLibraryPage: React.FC = () => {
  const [searchCategory, setSearchCategory] = useState<'courses' | 'videos' | 'health'>('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<EducationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [courseResults, setCourseResults] = useState<Course[]>([]);
  const [videoResults, setVideoResults] = useState<any[]>([]);
  const [healthIndexResults, setHealthIndexResults] = useState<any[]>([]);
  const [gameResults, setGameResults] = useState([]);
  const navigate = useNavigate();

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load courses and stats in parallel
      const [coursesData, statsData] = await Promise.all([
        courseApi.getCourses(),
        educationStatsApi.getEducationStats()
      ]);
      
      setCourses(coursesData);
      setStats(statsData);
    } catch (err) {
      console.error('Error loading initial data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setCourseResults([]);
      setVideoResults([]);
      setHealthIndexResults([]);
      return;
    }
    if (searchCategory === 'courses') {
      setCourseResults(courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      setVideoResults([]);
      setHealthIndexResults([]);
    } else if (searchCategory === 'videos') {
      setVideoResults((processedVideosData.videos || []).filter(video =>
        (video.title && video.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (video.original_name && video.original_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (video.series && video.series.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (video.language && video.language.toLowerCase().includes(searchQuery.toLowerCase()))
      ));
      setCourseResults([]);
      setHealthIndexResults([]);
    } else if (searchCategory === 'health') {
      const allHealthData = [
        ...plantHealthData, ...animalHealthData, ...soilHealthData, ...humanHealthData, ...planetaryHealthData
      ];
      setHealthIndexResults(allHealthData.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      ));
      setCourseResults([]);
      setVideoResults([]);
    }
  }, [searchQuery, searchCategory, courses]);

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/app/education/online-learning/courses/${courseId}`);
  };

  const clearSearch = async () => {
    setSearchQuery('');
    await loadInitialData();
  };

  // --- Dynamic summary data ---
  // Videos
  const videos = processedVideosData.videos || [];
  const videoCount = videos.length;
  const videoSeriesCount = new Set(videos.map(v => v.series)).size;
  const videoYears = videos
    .map(v => {
      const anyV = v as any;
      if (anyV.upload_date) return new Date(anyV.upload_date).getFullYear();
      if (anyV.created_at) return new Date(anyV.created_at).getFullYear();
      if (anyV.updated_at) return new Date(anyV.updated_at).getFullYear();
      return null;
    })
    .filter(Boolean);
  const videoYear = videoYears.length > 0 ? Math.max(...videoYears) : new Date().getFullYear();

  // Health Index
  const healthArrays = [soilHealthData, plantHealthData, animalHealthData, humanHealthData, planetaryHealthData];
  const healthIndices = healthArrays.length;
  const healthDataPoints = healthArrays.reduce((sum, arr) => sum + arr.length, 0);
  // No region field, so set to 1 (or omit if not needed)
  const healthRegions = 1;

  // Arcade
  const quizCategories = new Set(questions.map(q => q.category));
  const arcadeQuizzes = quizCategories.size;
  const arcadeGames = 1; // Only one main trivia game mode

  if (loading) {
    return (
      <div className="flex flex-col h-screen min-h-0">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading G.R.O.W Knowledge Hub...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {searchCategory === 'videos' ? (
        <VideoLibrarySearch />
      ) : (
        <>
          <div className="flex-1 flex flex-col items-center">
            <div className="text-center pt-2 pb-1">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                G.R.O.W Knowledge & Innovation Hub
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Discover all the learning resources, tools, and interactive experiences available in the G.R.O.W Knowledge & Innovation Hub. Start your journey with videos, courses, podcasts, and more!
              </p>
              
              {searchQuery && (
                <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-600">
                  <span>
                    {courseResults.length} course{courseResults.length !== 1 ? 's' : ''} found
                    {searchQuery && ` for "${searchQuery}"`}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="text-green-600 hover:text-green-700"
                  >
                    Clear
                  </Button>
                </div>
              )}

              {error && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </div>

            {searchQuery && courseResults.length > 0 && (
              <div className="w-full max-w-5xl px-4 mb-4">
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <h3 className="text-lg font-semibold mb-3">Search Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courseResults.slice(0, 6).map(course => (
                      <Card
                        key={course.id}
                        className="cursor-pointer transition-all duration-200 transform hover:scale-105 border-2 hover:border-green-300"
                        onClick={() => handleCourseClick(course.id)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-green-100 text-green-700">
                              {course.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                          </div>
                          <CardTitle className="text-sm font-semibold line-clamp-2">
                            {course.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <CardDescription className="text-xs line-clamp-2 mb-2">
                            {course.description}
                          </CardDescription>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{(course.students_count ?? 0).toLocaleString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {courseResults.length > 6 && (
                    <div className="text-center mt-4">
                      <Button
                        variant="outline"
                        onClick={() => navigate('/app/education/online-learning/courses')}
                      >
                        View All {courseResults.length} Results
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-slate-50 rounded-xl py-2 px-2 w-full max-w-5xl flex flex-col items-center mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-2">
                {educationalResources.slice(0, 3).map((resource) => {
                  const IconComponent = resource.icon;
                  return (
                    <Card
                      key={resource.id}
                      className={`cursor-pointer transition-all duration-200 transform hover:scale-105 border-2 ${resource.color} min-h-[120px] max-h-[140px] flex flex-col items-center justify-center`}
                      onClick={() => handleCardClick(resource.path)}
                    >
                      <CardHeader className="text-center pb-1 flex-shrink-0">
                        <div className={`mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md`}>
                          <IconComponent className={`h-4 w-4 ${resource.iconColor}`} />
                        </div>
                        <CardTitle className="text-sm font-semibold text-gray-900">
                          {resource.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center px-1 py-1">
                        <CardDescription className="text-gray-600 text-xs leading-tight">
                          {resource.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {educationalResources.slice(3, 6).map((resource) => {
                  const IconComponent = resource.icon;
                  return (
                    <Card
                      key={resource.id}
                      className={`cursor-pointer transition-all duration-200 transform hover:scale-105 border-2 ${resource.color} min-h-[120px] max-h-[140px] flex flex-col items-center justify-center`}
                      onClick={() => handleCardClick(resource.path)}
                    >
                      <CardHeader className="text-center pb-1 flex-shrink-0">
                        <div className={`mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md`}>
                          <IconComponent className={`h-4 w-4 ${resource.iconColor}`} />
                        </div>
                        <CardTitle className="text-sm font-semibold text-gray-900">
                          {resource.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center px-1 py-1">
                        <CardDescription className="text-gray-600 text-xs leading-tight">
                          {resource.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {searchCategory === 'courses' && courseResults.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold mb-2">Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courseResults.map(course => (
                    <Card key={course.id} className="cursor-pointer transition-all duration-200 transform hover:scale-105 border-2 hover:border-green-300">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-green-100 text-green-700">
                            {course.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <span>{course.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-sm font-semibold line-clamp-2">
                          {course.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-xs line-clamp-2 mb-2">
                          {course.description}
                        </CardDescription>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>{(course.students_count ?? 0).toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {searchCategory === 'health' && healthIndexResults.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold mb-2">GROW Health Index</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {healthIndexResults.map(item => (
                    <Card
                      key={item.id || item.name}
                      className="cursor-pointer"
                      onClick={() => alert(`${item.name}\n\n${item.description || ''}`)}
                    >
                      <CardHeader>
                        <CardTitle className="text-base font-semibold">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-xs line-clamp-2 mb-2">{item.description}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GrowLibraryPage; 