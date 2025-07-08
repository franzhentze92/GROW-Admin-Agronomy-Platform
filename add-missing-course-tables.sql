-- Add missing tables for complete course functionality

-- Create course_enrollments table
CREATE TABLE IF NOT EXISTS course_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    progress_percentage NUMERIC(5,2) DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    enrolled_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- Create course_reviews table
CREATE TABLE IF NOT EXISTS course_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security on new tables
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for course_enrollments
CREATE POLICY "Allow users to view their own enrollments" ON course_enrollments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow users to create their own enrollments" ON course_enrollments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own enrollments" ON course_enrollments
    FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for course_reviews
CREATE POLICY "Allow all users to view reviews" ON course_reviews
    FOR SELECT USING (true);

CREATE POLICY "Allow users to create their own reviews" ON course_reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own reviews" ON course_reviews
    FOR UPDATE USING (auth.uid() = user_id);

-- Insert sample instructor if none exists
INSERT INTO instructors (name, title, bio, email, location, experience, specializations) 
VALUES (
    'Dr. Graeme Sait', 
    'Nutrition Farming Expert', 
    'World-renowned soil health expert with 30+ years of experience in sustainable agriculture and nutrition farming.', 
    'graeme@example.com', 
    'Queensland, Australia', 
    '30+ years', 
    ARRAY['Soil Health', 'Nutrition Farming', 'Mineral Balance']
)
ON CONFLICT DO NOTHING;

-- Check if we have any instructors
SELECT COUNT(*) as instructor_count FROM instructors; 