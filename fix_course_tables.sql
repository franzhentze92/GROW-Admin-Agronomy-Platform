-- Fix Course Management Database Tables
-- Run this script in your Supabase SQL Editor

-- 1. Create course_tags table if it doesn't exist
CREATE TABLE IF NOT EXISTS course_tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    tag TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create course_learning_objectives table if it doesn't exist
CREATE TABLE IF NOT EXISTS course_learning_objectives (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    objective TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create course_prerequisites table if it doesn't exist
CREATE TABLE IF NOT EXISTS course_prerequisites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    prerequisite TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create lessons table if it doesn't exist
CREATE TABLE IF NOT EXISTS lessons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content JSONB DEFAULT '{}',
    order_index INTEGER NOT NULL,
    duration TEXT,
    type TEXT DEFAULT 'video',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_tags_course_id ON course_tags(course_id);
CREATE INDEX IF NOT EXISTS idx_course_learning_objectives_course_id ON course_learning_objectives(course_id);
CREATE INDEX IF NOT EXISTS idx_course_prerequisites_course_id ON course_prerequisites(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order_index ON lessons(order_index);

-- 6. Enable Row Level Security (RLS) - only if not already enabled
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'course_tags') THEN
        ALTER TABLE course_tags ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Enable read access for all users" ON course_tags FOR SELECT USING (true);
        CREATE POLICY "Enable insert for authenticated users" ON course_tags FOR INSERT WITH CHECK (auth.role() = 'authenticated');
        CREATE POLICY "Enable update for authenticated users" ON course_tags FOR UPDATE USING (auth.role() = 'authenticated');
        CREATE POLICY "Enable delete for authenticated users" ON course_tags FOR DELETE USING (auth.role() = 'authenticated');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'course_learning_objectives') THEN
        ALTER TABLE course_learning_objectives ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Enable read access for all users" ON course_learning_objectives FOR SELECT USING (true);
        CREATE POLICY "Enable insert for authenticated users" ON course_learning_objectives FOR INSERT WITH CHECK (auth.role() = 'authenticated');
        CREATE POLICY "Enable update for authenticated users" ON course_learning_objectives FOR UPDATE USING (auth.role() = 'authenticated');
        CREATE POLICY "Enable delete for authenticated users" ON course_learning_objectives FOR DELETE USING (auth.role() = 'authenticated');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'course_prerequisites') THEN
        ALTER TABLE course_prerequisites ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Enable read access for all users" ON course_prerequisites FOR SELECT USING (true);
        CREATE POLICY "Enable insert for authenticated users" ON course_prerequisites FOR INSERT WITH CHECK (auth.role() = 'authenticated');
        CREATE POLICY "Enable update for authenticated users" ON course_prerequisites FOR UPDATE USING (auth.role() = 'authenticated');
        CREATE POLICY "Enable delete for authenticated users" ON course_prerequisites FOR DELETE USING (auth.role() = 'authenticated');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'lessons') THEN
        ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Enable read access for all users" ON lessons FOR SELECT USING (true);
        CREATE POLICY "Enable insert for authenticated users" ON lessons FOR INSERT WITH CHECK (auth.role() = 'authenticated');
        CREATE POLICY "Enable update for authenticated users" ON lessons FOR UPDATE USING (auth.role() = 'authenticated');
        CREATE POLICY "Enable delete for authenticated users" ON lessons FOR DELETE USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- 7. Ensure courses table has all required columns
DO $$
BEGIN
    -- Add certificate_available column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'certificate_available') THEN
        ALTER TABLE courses ADD COLUMN certificate_available BOOLEAN DEFAULT false;
    END IF;
    
    -- Add instructor_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'instructor_id') THEN
        ALTER TABLE courses ADD COLUMN instructor_id UUID REFERENCES instructors(id);
    END IF;
    
    -- Add lessons_count column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'lessons_count') THEN
        ALTER TABLE courses ADD COLUMN lessons_count INTEGER DEFAULT 0;
    END IF;
    
    -- Add status column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'status') THEN
        ALTER TABLE courses ADD COLUMN status TEXT DEFAULT 'draft';
    END IF;
END $$;

-- 8. Create storage bucket for course assets if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('course-assets', 'course-assets', true)
ON CONFLICT (id) DO NOTHING;

-- 9. Set up storage policies for course assets
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'course-assets');
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'course-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update" ON storage.objects FOR UPDATE USING (bucket_id = 'course-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE USING (bucket_id = 'course-assets' AND auth.role() = 'authenticated');

-- 10. Verify tables were created successfully
SELECT 
    'course_tags' as table_name,
    COUNT(*) as row_count
FROM course_tags
UNION ALL
SELECT 
    'course_learning_objectives' as table_name,
    COUNT(*) as row_count
FROM course_learning_objectives
UNION ALL
SELECT 
    'course_prerequisites' as table_name,
    COUNT(*) as row_count
FROM course_prerequisites
UNION ALL
SELECT 
    'lessons' as table_name,
    COUNT(*) as row_count
FROM lessons; 