-- Debug the costs table to see what's happening
-- Check if the table exists and has data

-- 1. Check if the costs table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'costs';

-- 2. Check the table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'costs'
ORDER BY ordinal_position;

-- 3. Count total records in costs table
SELECT COUNT(*) as total_costs FROM costs;

-- 4. Show all costs (first 10)
SELECT 
  id,
  user_id,
  date,
  category,
  description,
  amount,
  expense_type,
  created_at,
  updated_at
FROM costs 
ORDER BY date DESC 
LIMIT 10;

-- 5. Check if there are any RLS (Row Level Security) policies
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

-- 6. Check if RLS is enabled on the costs table
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'costs'; 