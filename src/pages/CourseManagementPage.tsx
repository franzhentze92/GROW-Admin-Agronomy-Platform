import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Star,
  Calendar,
  Upload,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  Play,
  FileText,
  Target,
  Award,
  Settings,
  BarChart3,
  MessageSquare,
  Download,
  Loader2,
  Search,
  Filter,
  MoreHorizontal,
  BookOpen
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/hooks/use-toast';
import CourseCreatePage from './CourseCreatePage';

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  type: string;
  status: string;
  students_count: number;
  rating: number;
  lessons_count: number;
  created_at: string;
  updated_at: string;
  instructor_name?: string;
  instructor_title?: string;
}

const CourseManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'view' | 'create'>('view');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [totalInstructors, setTotalInstructors] = useState(0);

  // Fetch courses from database
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch total instructors on mount
  useEffect(() => {
    const fetchInstructors = async () => {
      const { data, error } = await supabase
        .from('instructors')
        .select('id');
      setTotalInstructors(data ? data.length : 0);
    };
    fetchInstructors();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      
      // Fetch all courses with instructor info
      let { data: courses, error } = await supabase
        .from('courses')
        .select('*, instructors(name, title)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching courses:', error);
        toast({
          title: "Error",
          description: "Failed to load courses",
          variant: "destructive",
        });
        return;
      }

      // Fetch all lessons (just id and course_id for efficiency)
      const { data: lessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('id, course_id');

      if (lessonsError) {
        console.error('Error fetching lessons:', lessonsError);
        toast({
          title: "Error",
          description: "Failed to load lessons",
          variant: "destructive",
        });
        return;
      }

      // Count lessons per course
      const lessonsCountMap = new Map();
      (lessons || []).forEach(lesson => {
        lessonsCountMap.set(
          lesson.course_id,
          (lessonsCountMap.get(lesson.course_id) || 0) + 1
        );
      });

      // Attach lessons_count to each course
      const transformedCourses = (courses || []).map(course => ({
        ...course,
        instructor_name: course.instructors?.name,
        instructor_title: course.instructors?.title,
        lessons_count: lessonsCountMap.get(course.id) || 0,
      }));

      setCourses(transformedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Error",
        description: "Failed to load courses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      console.log('=== STARTING COURSE DELETION ===');
      console.log('Course ID to delete:', courseId);

      // Delete the course directly - foreign key constraints with CASCADE should handle related data
      const { error: courseError } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (courseError) {
        console.error('Error deleting course:', courseError);
        throw courseError;
      }

      console.log('=== COURSE DELETION COMPLETE ===');
      console.log('Course and all related data deleted successfully');

      toast({
        title: "Success",
        description: "Course deleted successfully",
      });

      // Refresh the courses list
      fetchCourses();
    } catch (error: any) {
      console.error('Error deleting course:', error);
      toast({
        title: "Error",
        description: error?.message || "Failed to delete course",
        variant: "destructive",
      });
    }
  };

  const handlePublishCourse = async (courseId: string) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ status: 'published' })
        .eq('id', courseId);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Course published successfully",
      });

      // Refresh the courses list
      fetchCourses();
    } catch (error) {
      console.error('Error publishing course:', error);
      toast({
        title: "Error",
        description: "Failed to publish course",
        variant: "destructive",
      });
    }
  };

  const handleUnpublishCourse = async (courseId: string) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ status: 'draft' })
        .eq('id', courseId);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Course unpublished successfully",
      });

      // Refresh the courses list
      fetchCourses();
    } catch (error) {
      console.error('Error unpublishing course:', error);
      toast({
        title: "Error",
        description: "Failed to unpublish course",
        variant: "destructive",
      });
    }
  };

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor_name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [
    'Soil Health', 'Plant Health', 'Human Health', 'Animal Health', 'Planetary Health',
    'Crop Protection', 'Sustainable Practices', 'Technology', 'Business & Marketing', 'Innovation'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'Soil Health': 'bg-brown-100 text-brown-700',
      'Plant Health': 'bg-green-100 text-green-700',
      'Human Health': 'bg-red-100 text-red-700',
      'Animal Health': 'bg-orange-100 text-orange-700',
      'Planetary Health': 'bg-blue-100 text-blue-700',
      'Technology': 'bg-indigo-100 text-indigo-700',
      'Business & Marketing': 'bg-pink-100 text-pink-700',
      'Innovation': 'bg-yellow-100 text-yellow-700'
    };
    return colorMap[category] || 'bg-gray-100 text-gray-700';
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Beginner': return <BookOpen className="h-4 w-4" />;
      case 'Intermediate': return <Play className="h-4 w-4" />;
      case 'Advanced': return <Target className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Theory': return <BookOpen className="h-4 w-4" />;
      case 'Practice': return <Target className="h-4 w-4" />;
      case 'Mixed': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  // Calculate stats
  const totalStudents = courses.reduce((sum, course) => sum + (course.students_count || 0), 0);
  const totalRevenue = courses.reduce((sum, course) => sum + (course.price || 0), 0);
  const averageRating = courses.length > 0 
    ? courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length 
    : 0;

  if (activeTab === 'create') {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('view')}
            className="mb-4"
          >
            ← Back to Course Management
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Course</h1>
          <p className="text-gray-600">Create a new educational course</p>
        </div>
        <CourseCreatePage />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
        <p className="text-gray-600">Create, edit, and manage your educational courses</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('view')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'view'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              View All Courses
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'create'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Add New Course
            </button>
          </nav>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Instructors</p>
                <p className="text-2xl font-bold">{totalInstructors.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Lessons</p>
                <p className="text-2xl font-bold">{courses.reduce((sum, c) => sum + (c.lessons_count || 0), 0)}</p>
              </div>
              <BookOpen className="h-8 w-8 text-[#8cb33a]" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <Download className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search courses, instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Course List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <span className="ml-2 text-gray-600">Loading courses...</span>
        </div>
      ) : filteredCourses.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || selectedStatus !== 'all' || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first course'}
            </p>
            {!searchQuery && selectedStatus === 'all' && selectedCategory === 'all' && (
              <Button onClick={() => setActiveTab('create')} className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Create First Course
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                      <Badge className={getStatusColor(course.status)}>
                        {course.status}
                      </Badge>
                      <Badge className={getCategoryColor(course.category)}>
                        {course.category}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        {getLevelIcon(course.level)}
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(course.type)}
                        <span>{course.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.lessons_count || 0} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(course.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {course.instructor_name && (
                      <div className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">Instructor:</span> {course.instructor_name}
                        {course.instructor_title && ` - ${course.instructor_title}`}
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold text-gray-900">
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-6">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/app/education/online-learning/courses/${course.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/app/education/online-learning/course-edit/${course.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {course.status === 'draft' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePublishCourse(course.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        Publish
                      </Button>
                    ) : course.status === 'published' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUnpublishCourse(course.id)}
                        className="text-yellow-600 hover:text-yellow-700"
                      >
                        Unpublish
                      </Button>
                    ) : null}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteCourse(course.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseManagementPage; 