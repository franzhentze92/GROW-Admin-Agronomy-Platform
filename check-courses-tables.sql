-- Check what education-related tables already exist in the database
-- Run this in your Supabase SQL Editor to see what's already set up

-- Check for courses-related tables
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'courses',
    'instructors', 
    'lessons',
    'course_enrollments',
    'course_reviews',
    'course_tags',
    'course_learning_objectives',
    'course_prerequisites',
    'lesson_progress',
    'certificates',
    'analysis_tracker',
    'analysis_pricing'
)
ORDER BY table_name;

-- Check table structures for existing tables
-- This will show the columns and their types for each table that exists

-- Check courses table structure (if it exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'courses') THEN
        RAISE NOTICE '=== COURSES TABLE STRUCTURE ===';
        PERFORM column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'courses'
        ORDER BY ordinal_position;
    ELSE
        RAISE NOTICE 'courses table does not exist';
    END IF;
END $$;

-- Check instructors table structure (if it exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'instructors') THEN
        RAISE NOTICE '=== INSTRUCTORS TABLE STRUCTURE ===';
        PERFORM column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'instructors'
        ORDER BY ordinal_position;
    ELSE
        RAISE NOTICE 'instructors table does not exist';
    END IF;
END $$;

-- Check lessons table structure (if it exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'lessons') THEN
        RAISE NOTICE '=== LESSONS TABLE STRUCTURE ===';
        PERFORM column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'lessons'
        ORDER BY ordinal_position;
    ELSE
        RAISE NOTICE 'lessons table does not exist';
    END IF;
END $$;

-- Simple check for existing tables and their record counts
-- This will only query tables that actually exist
SELECT 'courses' as table_name, COUNT(*) as record_count FROM courses
UNION ALL
SELECT 'instructors' as table_name, COUNT(*) as record_count FROM instructors
UNION ALL
SELECT 'lessons' as table_name, COUNT(*) as record_count FROM lessons; 