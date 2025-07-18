-- Fix Course Deletion Issues
-- This script will check and fix any issues preventing course deletion

-- 1. Check current RLS policies on courses table
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual, 
    with_check
FROM pg_policies 
WHERE tablename = 'courses';

-- 2. Check if RLS is enabled on courses table
SELECT 
    schemaname, 
    tablename, 
    rowsecurity 
FROM pg_tables 
WHERE tablename = 'courses';

-- 3. Drop existing policies and recreate them to ensure they work
DROP POLICY IF EXISTS "Allow all operations on courses" ON courses;
DROP POLICY IF EXISTS "Enable read access for all users" ON courses;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON courses;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON courses;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON courses;

-- 4. Create a comprehensive policy that allows all operations
CREATE POLICY "Allow all operations on courses" ON courses 
FOR ALL USING (true) WITH CHECK (true);

-- 5. Check foreign key constraints on related tables
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    rc.delete_rule
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
JOIN information_schema.referential_constraints AS rc
    ON tc.constraint_name = rc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND ccu.table_name = 'courses';

-- 6. Ensure CASCADE delete is set up properly for related tables
-- This will update foreign key constraints to CASCADE on delete

-- Update course_tags foreign key to CASCADE
ALTER TABLE course_tags 
DROP CONSTRAINT IF EXISTS course_tags_course_id_fkey;

ALTER TABLE course_tags 
ADD CONSTRAINT course_tags_course_id_fkey 
FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE;

-- Update course_learning_objectives foreign key to CASCADE
ALTER TABLE course_learning_objectives 
DROP CONSTRAINT IF EXISTS course_learning_objectives_course_id_fkey;

ALTER TABLE course_learning_objectives 
ADD CONSTRAINT course_learning_objectives_course_id_fkey 
FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE;

-- Update course_prerequisites foreign key to CASCADE
ALTER TABLE course_prerequisites 
DROP CONSTRAINT IF EXISTS course_prerequisites_course_id_fkey;

ALTER TABLE course_prerequisites 
ADD CONSTRAINT course_prerequisites_course_id_fkey 
FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE;

-- Update lessons foreign key to CASCADE
ALTER TABLE lessons 
DROP CONSTRAINT IF EXISTS lessons_course_id_fkey;

ALTER TABLE lessons 
ADD CONSTRAINT lessons_course_id_fkey 
FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE;

-- Update lesson_progress foreign key to CASCADE (if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'lesson_progress') THEN
        ALTER TABLE lesson_progress 
        DROP CONSTRAINT IF EXISTS lesson_progress_course_id_fkey;
        
        ALTER TABLE lesson_progress 
        ADD CONSTRAINT lesson_progress_course_id_fkey 
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Update course_enrollments foreign key to CASCADE (if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'course_enrollments') THEN
        ALTER TABLE course_enrollments 
        DROP CONSTRAINT IF EXISTS course_enrollments_course_id_fkey;
        
        ALTER TABLE course_enrollments 
        ADD CONSTRAINT course_enrollments_course_id_fkey 
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Update course_reviews foreign key to CASCADE (if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'course_reviews') THEN
        ALTER TABLE course_reviews 
        DROP CONSTRAINT IF EXISTS course_reviews_course_id_fkey;
        
        ALTER TABLE course_reviews 
        ADD CONSTRAINT course_reviews_course_id_fkey 
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE;
    END IF;
END $$;

-- 7. Verify the setup
SELECT 
    'Foreign Key Constraints' as check_type,
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    rc.delete_rule
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
JOIN information_schema.referential_constraints AS rc
    ON tc.constraint_name = rc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND ccu.table_name = 'courses'
ORDER BY tc.table_name;

-- 8. Test deletion with a simple query (commented out for safety)
-- Uncomment the following lines to test deletion of a specific course
/*
-- Test deletion of a course (replace 'your-course-id' with actual course ID)
DELETE FROM courses WHERE id = 'your-course-id';
*/

-- 9. Show current course count
SELECT 
    'Current Course Count' as info,
    COUNT(*) as total_courses
FROM courses;
