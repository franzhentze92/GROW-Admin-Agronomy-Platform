-- Check your current user role
SELECT 
  id,
  email,
  raw_user_meta_data->>'role' as role,
  raw_user_meta_data
FROM auth.users 
WHERE email = 'franz@nutri-tech.com.au'; 