-- Create lesson_progress table for tracking user progress
CREATE TABLE IF NOT EXISTS lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    time_spent INTEGER DEFAULT 0, -- in seconds
    quiz_score INTEGER,
    quiz_answers JSONB,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_course_id ON lesson_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_completed ON lesson_progress(is_completed);

-- Add RLS policies for lesson_progress table
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own progress
CREATE POLICY "Users can view own lesson progress" ON lesson_progress
    FOR SELECT USING (auth.uid()::text = user_id::text);

-- Policy: Users can insert their own progress
CREATE POLICY "Users can insert own lesson progress" ON lesson_progress
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Policy: Users can update their own progress
CREATE POLICY "Users can update own lesson progress" ON lesson_progress
    FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Policy: Users can delete their own progress
CREATE POLICY "Users can delete own lesson progress" ON lesson_progress
    FOR DELETE USING (auth.uid()::text = user_id::text);

-- For testing purposes, allow all operations (remove this in production)
-- CREATE POLICY "Allow all operations for testing" ON lesson_progress FOR ALL USING (true); 