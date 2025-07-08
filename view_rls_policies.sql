-- View all RLS policies on the costs table
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'costs'
ORDER BY policyname; 