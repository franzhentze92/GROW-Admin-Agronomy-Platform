-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    long_description TEXT,
    category VARCHAR(50),
    duration VARCHAR(50),
    level VARCHAR(20),
    rating NUMERIC(2,1) DEFAULT 0,
    students INTEGER DEFAULT 0,
    lessons INTEGER DEFAULT 0,
    image VARCHAR(255),
    price NUMERIC(10,2) DEFAULT 0,
    type VARCHAR(20),
    certificate BOOLEAN DEFAULT FALSE,
    language VARCHAR(50),
    last_updated TIMESTAMP,
    status VARCHAR(20) DEFAULT 'published',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Instructors Table
CREATE TABLE IF NOT EXISTS instructors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    bio TEXT,
    avatar VARCHAR(255),
    email VARCHAR(100),
    website VARCHAR(255),
    location VARCHAR(100),
    experience TEXT,
    specializations TEXT[]
);

-- Lessons Table
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    order_index INTEGER,
    is_preview BOOLEAN DEFAULT FALSE,
    duration VARCHAR(20),
    video_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Course Enrollments Table
CREATE TABLE IF NOT EXISTS course_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    progress NUMERIC(5,2) DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    enrolled_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- Course Reviews Table
CREATE TABLE IF NOT EXISTS course_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Course Tags Table
CREATE TABLE IF NOT EXISTS course_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL
);

-- Course Learning Objectives Table
CREATE TABLE IF NOT EXISTS course_learning_objectives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    objective TEXT NOT NULL
);

-- Course Prerequisites Table
CREATE TABLE IF NOT EXISTS course_prerequisites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    prerequisite TEXT NOT NULL
); 