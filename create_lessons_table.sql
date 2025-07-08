-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration VARCHAR(20),
    type VARCHAR(20) CHECK (type IN ('video', 'reading', 'quiz', 'assignment')),
    content JSONB,
    order_index INTEGER NOT NULL,
    is_locked BOOLEAN DEFAULT FALSE,
    resources JSONB,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Add sample lessons for the Soil Testing Mastery course
DO $$
DECLARE
    course_uuid UUID;
BEGIN
    -- Get the course ID for Soil Testing Mastery
    SELECT id INTO course_uuid FROM courses WHERE slug = 'soil-testing-mastery' LIMIT 1;
    
    IF course_uuid IS NOT NULL THEN
        -- Insert lessons
        INSERT INTO lessons (course_id, title, description, duration, type, content, order_index, is_locked, created_at, updated_at) VALUES
        (course_uuid, 'Chapter 1: Foundations of Soil Therapy – Introduction', 'Introduction to the course and the importance of soil testing in Nutrition Farming®.', '5 min', 'reading', '{"readingContent": "Welcome to Chapter 1: Foundations of Soil Therapy, where we begin our journey into understanding the true power of soil testing."}', 1, false, NOW(), NOW()),
        
        (course_uuid, 'Chapter 1: Foundations of Soil Therapy – Video', 'Watch the Chapter 1 video presentation by Graeme Sait.', '20 min', 'video', '{"videoUrl": "/videos/soil-testing-mastery/GROW-APP_ST_E1.mp4"}', 2, false, NOW(), NOW()),
        
        (course_uuid, 'Chapter 1: Foundations of Soil Therapy – Summary', 'Detailed summary of Chapter 1 key concepts and takeaways.', '10 min', 'reading', '{"readingContent": "Detailed summary of Chapter 1 covering soil testing principles, mineral interactions, and the importance of understanding your soil."}', 3, false, NOW(), NOW()),
        
        (course_uuid, 'Chapter 2: Cracking the Code – Introduction', 'Introduction to practical soil test interpretation and key parameters.', '5 min', 'reading', '{"readingContent": "Now that you understand the philosophy and purpose behind soil testing, it is time to roll up your sleeves and start interpreting the numbers."}', 4, false, NOW(), NOW()),
        
        (course_uuid, 'Chapter 2: Cracking the Code – Video', 'Watch the Chapter 2 video presentation by Graeme Sait.', '20 min', 'video', '{"videoUrl": "/videos/soil-testing-mastery/GROW-APP_ST_E2.mp4"}', 5, false, NOW(), NOW()),
        
        (course_uuid, 'Chapter 2: Cracking the Code – Summary', 'Detailed summary of Chapter 2 key concepts and takeaways.', '10 min', 'reading', '{"readingContent": "Detailed summary of Chapter 2 covering CEC, TEC, pH, conductivity, organic matter, and paramagnetism."}', 6, false, NOW(), NOW()),
        
        (course_uuid, 'Chapter 3: From Data to Decisions – Introduction', 'Introduction to practical application using real soil test examples.', '5 min', 'reading', '{"readingContent": "Welcome to Chapter 3, where things get real. In this pivotal session, Graeme Sait takes you into the practical reality of soil interpretation."}', 7, false, NOW(), NOW()),
        
        (course_uuid, 'Chapter 3: From Data to Decisions – Video', 'Watch the Chapter 3 video presentation by Graeme Sait.', '20 min', 'video', '{"videoUrl": "/videos/soil-testing-mastery/GROW-APP_ST_E3.mp4"}', 8, false, NOW(), NOW()),
        
        (course_uuid, 'Chapter 3: From Data to Decisions – Summary', 'Detailed summary of Chapter 3 key concepts and takeaways.', '10 min', 'reading', '{"readingContent": "Detailed summary of Chapter 3 covering base saturation, mineral ratios, antagonisms, and corrective strategies."}', 9, false, NOW(), NOW()),
        
        (course_uuid, 'Chapter 4: Mastering Mineral Ratios – Introduction', 'Introduction to the six most important mineral ratios and precision strategies.', '5 min', 'reading', '{"readingContent": "Welcome to the final chapter: Mastering Mineral Ratios. At this point, you have learned how to read a soil test, interpret its values."}', 10, false, NOW(), NOW()),
        
        (course_uuid, 'Chapter 4: Mastering Mineral Ratios – Video', 'Watch the Chapter 4 video presentation by Graeme Sait.', '20 min', 'video', '{"videoUrl": "/videos/soil-testing-mastery/GROW-APP_ST_E4.mp4"}', 11, false, NOW(), NOW()),
        
        (course_uuid, 'Chapter 4: Mastering Mineral Ratios – Summary', 'Detailed summary of Chapter 4 key concepts and takeaways.', '10 min', 'reading', '{"readingContent": "Detailed summary of Chapter 4 covering the six critical mineral ratios, calculation methods, and precision strategies."}', 12, false, NOW(), NOW()),
        
        (course_uuid, 'Final Quiz – Test Your Knowledge', 'Comprehensive quiz covering all course material.', '15 min', 'quiz', '{"quizQuestions": [{"id": "q1", "question": "What is the primary principle that underpins Nutrition Farming?", "options": ["Using more synthetic chemicals", "Solving problems at the source, not symptoms", "Applying maximum fertiliser rates", "Focusing only on crop yield"], "correctAnswer": 1, "explanation": "Nutrition Farming focuses on solving problems at the root cause rather than treating symptoms, which leads to more sustainable and profitable farming."}]}', 13, false, NOW(), NOW());
        
        RAISE NOTICE 'Successfully added 13 lessons for course ID: %', course_uuid;
    ELSE
        RAISE NOTICE 'Course not found. Please ensure the Soil Testing Mastery course exists in the database.';
    END IF;
END $$; 