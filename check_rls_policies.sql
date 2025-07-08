-- Check existing RLS policies on the costs table
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'costs';

-- Check if there are any policies at all
SELECT COUNT(*) as policy_count
FROM pg_policies 
WHERE tablename = 'costs'; 