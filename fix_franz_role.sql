-- Update Franz's role to admin
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  raw_user_meta_data, 
  '{role}', 
  '"admin"'
)
WHERE email = 'franz@nutri-tech.com.au';

-- Verify the update
SELECT 
  id,
  email,
  raw_user_meta_data->>'role' as role,
  raw_user_meta_data
FROM auth.users 
WHERE email = 'franz@nutri-tech.com.au'; 