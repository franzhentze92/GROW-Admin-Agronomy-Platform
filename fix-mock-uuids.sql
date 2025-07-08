-- Fix Mock UUIDs in the GROW Admin Platform
-- This script will replace mock UUIDs with proper ones

-- Step 1: Create new users with proper UUIDs
INSERT INTO users (id, name, email, role, created_at, updated_at) VALUES
(gen_random_uuid(), 'Admin User', 'admin@ntsgrow.com', 'admin', NOW(), NOW()),
(gen_random_uuid(), 'Marco Giorgio', 'marco@ntsgrow.com', 'agronomist', NOW(), NOW()),
(gen_random_uuid(), 'Alan Montalbetti', 'alan@ntsgrow.com', 'agronomist', NOW(), NOW()),
(gen_random_uuid(), 'Adriano de Senna', 'adriano@ntsgrow.com', 'agronomist', NOW(), NOW()),
(gen_random_uuid(), 'Fred Ghorbson', 'fred@ntsgrow.com', 'agronomist', NOW(), NOW()),
(gen_random_uuid(), 'Karl Holland', 'karl@ntsgrow.com', 'agronomist', NOW(), NOW());

-- Step 2: Get the new UUIDs for reference
SELECT id, name, email FROM users WHERE email IN (
  'admin@ntsgrow.com',
  'marco@ntsgrow.com', 
  'alan@ntsgrow.com',
  'adriano@ntsgrow.com',
  'fred@ntsgrow.com',
  'karl@ntsgrow.com'
) ORDER BY name;

-- Step 3: Update field trials to use the new Karl Holland UUID
-- (Replace 'NEW_KARL_UUID' with the actual UUID from step 2)
UPDATE field_trials 
SET responsible_agronomist_id = (
  SELECT id FROM users WHERE email = 'karl@ntsgrow.com' LIMIT 1
)
WHERE responsible_agronomist_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

-- Step 4: Delete old mock users
DELETE FROM users WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
);

-- Step 5: Verify the cleanup
SELECT 'Users after cleanup:' as info;
SELECT id, name, email, role FROM users ORDER BY name;

SELECT 'Field trials after cleanup:' as info;
SELECT id, name, responsible_agronomist_id FROM field_trials ORDER BY created_at DESC; 