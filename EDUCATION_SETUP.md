# Education Section Setup Guide

This guide provides the steps to set up the database and features for the Education section in the G.R.O.W Admin Platform.

## 1. Database Setup

### Run the SQL Script
1. Navigate to your Supabase project
2. Go to the **SQL Editor** from the sidebar
3. Click on **New query**
4. Copy the entire content of the `supabase_education_setup.sql` file
5. Paste the script into the SQL editor
6. Click **Run** to execute the script

This will create:
- `courses` table with comprehensive course data
- `lessons` table for individual lesson content
- `course_enrollments` table for user enrollments
- `lesson_progress` table for tracking user progress
- `certificates` table for course completion certificates
- `course_reviews` table for user reviews and ratings
- Proper indexes for performance
- Row Level Security (RLS) policies
- Triggers for automatic timestamps and statistics updates

## 2. Features Overview

### GROW Library Page (`/app/education/library`)
- **Search Functionality**: Real-time search across courses, descriptions, and tags
- **Statistics Dashboard**: Shows total courses, students, lessons, and average ratings
- **Resource Navigation**: Quick access to all educational resources
- **Database Integration**: Connected to Supabase for real data
- **Error Handling**: Graceful fallback to mock data if database is unavailable
- **Loading States**: Proper loading indicators and user feedback

### Key Features Implemented:
- ✅ Database connectivity with fallback to mock data
- ✅ Real-time search functionality
- ✅ Statistics overview
- ✅ Error handling and loading states
- ✅ Responsive design
- ✅ TypeScript type safety

## 3. API Services

The education section uses the following API services:

### `courseApi`
- `getCourses()`: Fetch all published courses
- `searchCourses(query)`: Search courses by title, description, or tags
- `getCourseById(id)`: Get specific course details
- `createCourse(data)`: Create new course (admin/instructor only)
- `updateCourse(id, updates)`: Update course (admin/instructor only)
- `deleteCourse(id)`: Delete course (admin/instructor only)

### `educationStatsApi`
- `getEducationStats()`: Get overall education platform statistics

### `lessonApi`
- `getLessonsByCourse(courseId)`: Get all lessons for a course
- `getLessonById(id)`: Get specific lesson details
- `createLesson(data)`: Create new lesson (admin/instructor only)
- `updateLesson(id, updates)`: Update lesson (admin/instructor only)
- `deleteLesson(id)`: Delete lesson (admin/instructor only)

### `enrollmentApi`
- `getUserEnrollments(userId)`: Get user's course enrollments
- `enrollInCourse(userId, courseId)`: Enroll user in a course
- `updateEnrollment(id, updates)`: Update enrollment status
- `isEnrolled(userId, courseId)`: Check if user is enrolled

### `progressApi`
- `getUserProgress(userId, courseId)`: Get user's lesson progress
- `markLessonComplete(userId, lessonId, courseId)`: Mark lesson as completed
- `updateLessonProgress(userId, lessonId, courseId, updates)`: Update progress
- `getCourseProgress(userId, courseId)`: Get course completion percentage

### `reviewApi`
- `getCourseReviews(courseId)`: Get reviews for a course
- `createReview(data)`: Create new review
- `updateReview(id, updates)`: Update review

### `certificateApi`
- `getUserCertificates(userId)`: Get user's certificates
- `generateCertificate(userId, courseId)`: Generate completion certificate

## 4. Database Schema

### Courses Table
```sql
- id: UUID (Primary Key)
- title: VARCHAR(255) (Required)
- description: TEXT
- long_description: TEXT
- category: VARCHAR(100) (Required)
- duration: VARCHAR(50)
- level: ENUM('Beginner', 'Intermediate', 'Advanced')
- rating: DECIMAL(3,2) (Default: 0)
- students_count: INTEGER (Default: 0)
- lessons_count: INTEGER (Default: 0)
- image_url: VARCHAR(500)
- price: DECIMAL(10,2) (Default: 0)
- type: ENUM('Theory', 'Practice', 'Mixed')
- tags: TEXT[]
- learning_objectives: TEXT[]
- prerequisites: TEXT[]
- certificate_available: BOOLEAN (Default: false)
- language: VARCHAR(50) (Default: 'English')
- status: ENUM('draft', 'published', 'archived') (Default: 'draft')
- instructor_*: Various instructor fields
- created_at: TIMESTAMP WITH TIME ZONE
- updated_at: TIMESTAMP WITH TIME ZONE
```

### Lessons Table
```sql
- id: UUID (Primary Key)
- course_id: UUID (Foreign Key to courses)
- title: VARCHAR(255) (Required)
- description: TEXT
- duration: VARCHAR(50)
- type: ENUM('video', 'reading', 'quiz', 'assignment')
- content: JSONB (Flexible content storage)
- order_index: INTEGER (Required)
- is_locked: BOOLEAN (Default: false)
- resources: JSONB
- notes: TEXT
- created_at: TIMESTAMP WITH TIME ZONE
- updated_at: TIMESTAMP WITH TIME ZONE
```

### Course Enrollments Table
```sql
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key to users)
- course_id: UUID (Foreign Key to courses)
- enrolled_at: TIMESTAMP WITH TIME ZONE
- completed_at: TIMESTAMP WITH TIME ZONE
- progress_percentage: INTEGER (0-100)
- last_accessed_at: TIMESTAMP WITH TIME ZONE
- status: ENUM('active', 'completed', 'dropped')
```

## 5. Security Features

### Row Level Security (RLS)
- **Courses**: Users can view published courses, instructors can manage their courses
- **Lessons**: Users can view lessons of published courses, instructors can manage lessons
- **Enrollments**: Users can only access their own enrollments
- **Progress**: Users can only access their own progress
- **Reviews**: Users can view reviews for enrolled courses, create/update their own reviews
- **Certificates**: Users can only view their own certificates

### User Roles
- **Authenticated Users**: Can view courses, enroll, track progress, leave reviews
- **Instructors**: Can manage their own courses and lessons
- **Admins**: Can manage all courses and lessons

## 6. Testing the Setup

1. **Start the development server**: `npm run dev`
2. **Navigate to**: `http://localhost:8080/app/education/library`
3. **Test features**:
   - Search functionality (try searching for "soil" or "health")
   - Statistics display
   - Navigation to different educational resources
   - Error handling (if database is not configured)

## 7. Next Steps

The GROW Library page is now fully functional with database connectivity. Next pages to implement:

1. **Courses Page** (`/app/education/online-learning/courses`)
2. **Course Detail Page** (`/app/education/online-learning/courses/:courseId`)
3. **Lesson Page** (`/app/education/online-learning/courses/:courseId/lessons/:lessonId`)
4. **Course Management Page** (`/app/education/online-learning/course-management`)
5. **Video Library Page** (`/app/education/online-learning/videos`)
6. **Articles Page** (`/app/education/articles`)

Each page will follow the same pattern of database connectivity with fallback to mock data for development and testing.

## 8. Troubleshooting

### Database Connection Issues
- Ensure Supabase environment variables are set correctly
- Check that the SQL script has been executed successfully
- Verify RLS policies are in place
- Check browser console for specific error messages

### Search Not Working
- Verify the search query is being sent correctly
- Check that courses have the correct status ('published')
- Ensure the search function is properly filtering results

### Statistics Not Loading
- Check that the statistics queries are working
- Verify that there is data in the tables
- Check for any RLS policy restrictions

## 9. Environment Variables

Make sure these are set in your `.env.local` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The education section is now ready for use with full database connectivity and a robust fallback system for development and testing! 