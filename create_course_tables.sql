-- Create course_tags table
CREATE TABLE IF NOT EXISTS course_tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    tag TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course_learning_objectives table
CREATE TABLE IF NOT EXISTS course_learning_objectives (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    objective TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course_prerequisites table
CREATE TABLE IF NOT EXISTS course_prerequisites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    prerequisite TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lessons table
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_tags_course_id ON course_tags(course_id);
CREATE INDEX IF NOT EXISTS idx_course_learning_objectives_course_id ON course_learning_objectives(course_id);
CREATE INDEX IF NOT EXISTS idx_course_prerequisites_course_id ON course_prerequisites(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order_index ON lessons(order_index);

-- Enable Row Level Security (RLS)
ALTER TABLE course_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_learning_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_prerequisites ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for course_tags
CREATE POLICY "Enable read access for all users" ON course_tags FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON course_tags FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON course_tags FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON course_tags FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for course_learning_objectives
CREATE POLICY "Enable read access for all users" ON course_learning_objectives FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON course_learning_objectives FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON course_learning_objectives FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON course_learning_objectives FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for course_prerequisites
CREATE POLICY "Enable read access for all users" ON course_prerequisites FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON course_prerequisites FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON course_prerequisites FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON course_prerequisites FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for lessons
CREATE POLICY "Enable read access for all users" ON lessons FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON lessons FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON lessons FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON lessons FOR DELETE USING (auth.role() = 'authenticated'); 