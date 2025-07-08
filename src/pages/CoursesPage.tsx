import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award,
  Leaf,
  Heart,
  User,
  PawPrint,
  Globe,
  Droplets,
  Shield,
  Zap,
  TrendingUp,
  Target,
  Lightbulb,
  GraduationCap,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Course } from '@/lib/educationApi';
import { courseApi } from '@/lib/educationApi';

const CoursesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Courses', icon: GraduationCap, color: 'bg-gray-100 text-gray-700' },
    { id: 'soil-health', name: 'Soil Health', icon: Droplets, color: 'bg-brown-100 text-brown-700' },
    { id: 'plant-health', name: 'Plant Health', icon: Leaf, color: 'bg-green-100 text-green-700' },
    { id: 'human-health', name: 'Human Health', icon: Heart, color: 'bg-red-100 text-red-700' },
    { id: 'animal-health', name: 'Animal Health', icon: PawPrint, color: 'bg-orange-100 text-orange-700' },
    { id: 'planetary-health', name: 'Planetary Health', icon: Globe, color: 'bg-blue-100 text-blue-700' },
    { id: 'crop-protection', name: 'Crop Protection', icon: Shield, color: 'bg-purple-100 text-purple-700' },
    { id: 'sustainable-practices', name: 'Sustainable Practices', icon: Zap, color: 'bg-teal-100 text-teal-700' },
    { id: 'technology', name: 'Technology', icon: TrendingUp, color: 'bg-indigo-100 text-indigo-700' },
    { id: 'business', name: 'Business & Marketing', icon: Target, color: 'bg-pink-100 text-pink-700' },
    { id: 'innovation', name: 'Innovation', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-700' },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await courseApi.getCourses();
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (course.tags ?? []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesPrice = selectedPrice === 'all' || 
                        (selectedPrice === 'free' && course.price === 0) ||
                        (selectedPrice === 'paid' && course.price > 0) ||
                        (selectedPrice === 'under-50' && course.price > 0 && course.price < 50) ||
                        (selectedPrice === '50-100' && course.price >= 50 && course.price <= 100) ||
                        (selectedPrice === 'over-100' && course.price > 100);
    const matchesType = selectedType === 'all' || course.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice && matchesType;
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || GraduationCap;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || 'bg-gray-100 text-gray-700';
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-300';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Theory': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Practice': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Mixed': return 'bg-pink-100 text-pink-800 border-pink-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const handleEnroll = (courseId: string) => {
    // Navigate to course detail page
    navigate(`/app/education/online-learning/courses/${courseId}`);
  };

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/app/education/online-learning/courses/${courseId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#8cb33a]" />
            <p className="text-gray-600">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Courses</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-[#8cb33a] hover:bg-[#729428]"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          G.R.O.W Learning Center
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master sustainable agriculture through our comprehensive courses designed by industry experts. 
          From soil health to planetary wellness, advance your knowledge and skills.
        </p>
        <div className="my-8"></div>
        <p className="text-gray-600 mb-6 text-justify">
          Whether you're a beginner looking to learn the basics or an experienced professional seeking advanced knowledge, 
          our comprehensive library has something for everyone. Start your learning journey today and discover the latest 
          insights in sustainable agriculture and crop management.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <form onSubmit={e => e.preventDefault()}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search courses, topics, or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3"
              />
            </form>
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Categories</option>
              {categories.filter(cat => cat.id !== 'all').map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
              <option value="under-50">Under $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="over-100">Over $100</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Types</option>
              <option value="Theory">Theory</option>
              <option value="Practice">Practice</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>
        </div>
        
        {/* Results count */}
        <div className="text-sm text-gray-600 mb-4">
          Showing {filteredCourses.length} of {courses.length} courses
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const CategoryIcon = getCategoryIcon(course.category);
          const categoryColor = getCategoryColor(course.category);
          
          return (
            <Card
              key={course.id}
              className={`cursor-pointer transition-all duration-200 transform hover:scale-105 border-2 ${categoryColor}`}
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="h-32 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${course.image || '/how-to-thumbnails-languages/grow-courses.jpeg'}')` }}>
                <div className="h-full w-full bg-black bg-opacity-20 flex items-center justify-center">
                  <CategoryIcon className="h-12 w-12 text-white drop-shadow-lg" />
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-1">
                  <Badge className={categoryColor}>
                    {categories.find(cat => cat.id === course.category)?.name || course.category}
                  </Badge>
                  <div className="flex gap-1">
                    <Badge className={getLevelBadgeColor(course.level)}>
                      {course.level}
                    </Badge>
                    <Badge className={getTypeBadgeColor(course.type)}>
                      {course.type}
                    </Badge>
                  </div>
                </div>
                
                <CardTitle className="text-base font-semibold line-clamp-2">
                  {course.title}
                </CardTitle>
                
                <CardDescription className="text-gray-600 text-sm leading-snug text-justify mt-1">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 pb-2">
                {/* Course Stats */}
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{course.lessons_count || 0} lessons</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {(course.tags ?? []).slice(0, 2).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Instructor */}
                <div className="text-xs text-gray-800 font-semibold mb-2 flex items-center gap-2">
                  {course.instructor_avatar && (
                    <img src={course.instructor_avatar} alt={course.instructor_name} className="w-6 h-6 rounded-full object-cover border border-gray-300" />
                  )}
                  Instructor: {course.instructor_name || 'TBD'}
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <div className="text-base font-bold">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnroll(course.id);
                    }}
                    className="bg-[#8cb33a] hover:bg-[#729428] h-8 px-3 text-xs border-none shadow-none"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Enroll
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && !loading && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
          <Button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLevel('all');
              setSelectedPrice('all');
              setSelectedType('all');
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CoursesPage; 