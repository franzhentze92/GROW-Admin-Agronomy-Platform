-- Add RLS policy for admin/super-admin users to view all costs
-- This policy allows users with admin or super-admin role to see all costs

CREATE POLICY "Admin users can view all costs" ON costs
FOR SELECT
TO public
USING (
  -- Allow if user has admin or super-admin role in user_metadata
  (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' IN ('admin', 'super-admin')
  OR
  -- Fallback: allow if user has admin or super-admin role at top level
  auth.jwt() ->> 'role' IN ('admin', 'super-admin')
);

-- Verify the policy was created
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'costs'
AND policyname = 'Admin users can view all costs'; 