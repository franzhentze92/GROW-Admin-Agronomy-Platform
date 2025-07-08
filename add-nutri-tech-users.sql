-- Add Nutri-Tech Users to the database
-- Run this in your Supabase SQL Editor

-- Admin Users
INSERT INTO users (id, name, email, role, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'Graeme Sait', 'graeme@nutri-tech.com.au', 'admin', NOW(), NOW()),
  (gen_random_uuid(), 'Andrew Cook', 'andrewc@nutri-tech.com.au', 'admin', NOW(), NOW()),
  (gen_random_uuid(), 'Marco Giorgio', 'marco@nutri-tech.com.au', 'admin', NOW(), NOW())
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  updated_at = NOW();

-- Agronomist Users
INSERT INTO users (id, name, email, role, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'Alan', 'alan@nutri-tech.com.au', 'agronomist', NOW(), NOW()),
  (gen_random_uuid(), 'Adriano', 'adriano@nutri-tech.com.au', 'agronomist', NOW(), NOW()),
  (gen_random_uuid(), 'Fred Ghorbani', 'fred@nutri-tech.com.au', 'agronomist', NOW(), NOW()),
  (gen_random_uuid(), 'Karl Holland', 'karl@nutri-tech.com.au', 'agronomist', NOW(), NOW())
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  updated_at = NOW();

-- Verify all users were added
SELECT id, name, email, role, created_at 
FROM users 
WHERE email IN (
  'graeme@nutri-tech.com.au',
  'andrewc@nutri-tech.com.au',
  'marco@nutri-tech.com.au',
  'alan@nutri-tech.com.au',
  'adriano@nutri-tech.com.au',
  'fred@nutri-tech.com.au',
  'karl@nutri-tech.com.au'
)
ORDER BY role, name;

-- Manual Auth User Creation Instructions:
-- You'll need to create these users in Supabase Auth manually:
-- 
-- 1. Go to Authentication > Users in your Supabase dashboard
-- 2. Click "Add User" for each user below:
--
-- ADMIN USERS:
-- - Email: graeme@nutri-tech.com.au
-- - Password: GraemeAdmin123!!
-- - Metadata: {"name": "Graeme Sait", "role": "admin"}
--
-- - Email: andrewc@nutri-tech.com.au
-- - Password: AndrewAdmin123!!
-- - Metadata: {"name": "Andrew Cook", "role": "admin"}
--
-- - Email: marco@nutri-tech.com.au
-- - Password: MarcoAdmin123!!
-- - Metadata: {"name": "Marco Giorgio", "role": "admin"}
--
-- AGRONOMIST USERS:
-- - Email: alan@nutri-tech.com.au
-- - Password: AlanAgro123!!
-- - Metadata: {"name": "Alan", "role": "agronomist"}
--
-- - Email: adriano@nutri-tech.com.au
-- - Password: AdrianoAgro123!!
-- - Metadata: {"name": "Adriano", "role": "agronomist"}
--
-- - Email: fred@nutri-tech.com.au
-- - Password: FredAgro123!!
-- - Metadata: {"name": "Fred Ghorbani", "role": "agronomist"}
--
-- - Email: karl@nutri-tech.com.au
-- - Password: KarlAgro123!!
-- - Metadata: {"name": "Karl Holland", "role": "agronomist"}
--
-- Remember to check "Auto-confirm user" for all users! 