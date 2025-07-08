-- Check the exact structure of the existing courses table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'courses'
ORDER BY ordinal_position;

-- Check if there are any existing courses
SELECT COUNT(*) as existing_courses FROM courses;

-- Check if there are any existing instructors
SELECT COUNT(*) as existing_instructors FROM instructors;

-- Show sample instructor data if any exists
SELECT id, name, title, email FROM instructors LIMIT 5; 