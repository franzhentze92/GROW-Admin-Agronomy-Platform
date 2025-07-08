-- Update courses table to match the course creation form fields
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS instructor_id UUID REFERENCES instructors(id),
ADD COLUMN IF NOT EXISTS certificate_available BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS lessons_count INTEGER DEFAULT 0;

-- Update lessons table to match the lesson creation form fields
ALTER TABLE lessons 
ADD COLUMN IF NOT EXISTS type VARCHAR(20) CHECK (type IN ('video', 'reading', 'quiz', 'assignment')),
ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS resources JSONB,
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Rename certificate column to match the form
ALTER TABLE courses RENAME COLUMN certificate TO certificate_available;

-- Update the lessons table to use JSONB for content instead of TEXT
ALTER TABLE lessons ALTER COLUMN content TYPE JSONB USING content::jsonb;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_instructor_id ON courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order_index ON lessons(order_index);

-- Add RLS policies for the new tables if they don't exist
DO $$
BEGIN
    -- Enable RLS on courses if not already enabled
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'courses') THEN
        ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
        
        -- Policy: Allow all operations for now (adjust for production)
        CREATE POLICY "Allow all operations on courses" ON courses FOR ALL USING (true);
    END IF;
    
    -- Enable RLS on instructors if not already enabled
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'instructors') THEN
        ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
        
        -- Policy: Allow all operations for now (adjust for production)
        CREATE POLICY "Allow all operations on instructors" ON instructors FOR ALL USING (true);
    END IF;
    
    -- Enable RLS on lessons if not already enabled
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'lessons') THEN
        ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
        
        -- Policy: Allow all operations for now (adjust for production)
        CREATE POLICY "Allow all operations on lessons" ON lessons FOR ALL USING (true);
    END IF;
    
    -- Enable RLS on course_tags if not already enabled
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'course_tags') THEN
        ALTER TABLE course_tags ENABLE ROW LEVEL SECURITY;
        
        -- Policy: Allow all operations for now (adjust for production)
        CREATE POLICY "Allow all operations on course_tags" ON course_tags FOR ALL USING (true);
    END IF;
    
    -- Enable RLS on course_learning_objectives if not already enabled
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'course_learning_objectives') THEN
        ALTER TABLE course_learning_objectives ENABLE ROW LEVEL SECURITY;
        
        -- Policy: Allow all operations for now (adjust for production)
        CREATE POLICY "Allow all operations on course_learning_objectives" ON course_learning_objectives FOR ALL USING (true);
    END IF;
    
    -- Enable RLS on course_prerequisites if not already enabled
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'course_prerequisites') THEN
        ALTER TABLE course_prerequisites ENABLE ROW LEVEL SECURITY;
        
        -- Policy: Allow all operations for now (adjust for production)
        CREATE POLICY "Allow all operations on course_prerequisites" ON course_prerequisites FOR ALL USING (true);
    END IF;
END $$; 