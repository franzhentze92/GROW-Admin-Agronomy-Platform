-- Temporarily disable RLS for testing treatments and variables
-- WARNING: This is for testing only - re-enable RLS for production!

-- Disable RLS on treatments table
ALTER TABLE field_trial_treatments DISABLE ROW LEVEL SECURITY;

-- Disable RLS on variables table  
ALTER TABLE field_trial_variables DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('field_trial_treatments', 'field_trial_variables');

-- Optional: Add a simple policy that allows all operations for testing
-- CREATE POLICY "Allow all operations for testing" ON field_trial_treatments FOR ALL USING (true);
-- CREATE POLICY "Allow all operations for testing" ON field_trial_variables FOR ALL USING (true); 