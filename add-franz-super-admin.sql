-- Add Franz Hentze as Super Admin user
-- Run this in your Supabase SQL Editor

-- First, let's create a UUID for Franz
-- You can generate a UUID or use a specific one
-- For now, we'll use a generated UUID

-- Insert Franz into the users table
INSERT INTO users (id, name, email, role, created_at, updated_at) 
VALUES (
  gen_random_uuid(), -- This will generate a new UUID
  'Franz Hentze',
  'franz@nutri-tech.com.au',
  'super-admin',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  updated_at = NOW();

-- Verify the user was added
SELECT id, name, email, role, created_at 
FROM users 
WHERE email = 'franz@nutri-tech.com.au';

-- Note: You'll also need to create this user in Supabase Auth manually:
-- 1. Go to Authentication > Users in your Supabase dashboard
-- 2. Click "Add User"
-- 3. Enter: franz@nutri-tech.com.au
-- 4. Set password: FranzSuperAdmin123!
-- 5. Check "Auto-confirm user"
-- 6. Add metadata: {"name": "Franz Hentze", "role": "super-admin"}
-- 7. Click "Create User" 