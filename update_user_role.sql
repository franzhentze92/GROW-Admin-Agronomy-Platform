-- Update user role in Supabase Auth user_metadata
-- This script updates the role for a specific user to 'admin' or 'super-admin'

-- Option 1: Update by email (replace with your email)
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{role}', 
  '"admin"'
)
WHERE email = 'franz@nutri-tech.com.au';

-- Option 2: Update by user ID (replace with your user ID)
-- UPDATE auth.users 
-- SET raw_user_meta_data = jsonb_set(
--   COALESCE(raw_user_meta_data, '{}'::jsonb), 
--   '{role}', 
--   '"admin"'
-- )
-- WHERE id = 'your-user-id-here';

-- Option 3: Update to super-admin role
-- UPDATE auth.users 
-- SET raw_user_meta_data = jsonb_set(
--   COALESCE(raw_user_meta_data, '{}'::jsonb), 
--   '{role}', 
--   '"super-admin"'
-- )
-- WHERE email = 'franz@nutri-tech.com.au';

-- Verify the update
SELECT 
  id,
  email,
  raw_user_meta_data->>'role' as role,
  raw_user_meta_data
FROM auth.users 
WHERE email = 'franz@nutri-tech.com.au'; 