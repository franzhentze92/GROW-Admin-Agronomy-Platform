-- Check current user role in Supabase Auth
-- This script shows the current role for all users or a specific user

-- Check all users and their roles
SELECT 
  id,
  email,
  raw_user_meta_data->>'role' as role,
  raw_user_meta_data
FROM auth.users 
ORDER BY email;

-- Check specific user by email
SELECT 
  id,
  email,
  raw_user_meta_data->>'role' as role,
  raw_user_meta_data
FROM auth.users 
WHERE email = 'franz@nutri-tech.com.au';

-- Check if there are any costs in the database
SELECT 
  COUNT(*) as total_costs,
  COUNT(DISTINCT user_id) as unique_users_with_costs
FROM costs;

-- Show sample costs (first 5)
SELECT 
  id,
  user_id,
  date,
  category,
  description,
  amount,
  expense_type
FROM costs 
ORDER BY date DESC 
LIMIT 5; 