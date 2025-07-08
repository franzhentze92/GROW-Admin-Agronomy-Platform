-- Update users with real UUIDs from Supabase Auth
-- Replace the UUIDs below with the actual UUIDs from your Supabase Auth users

-- First, let's see what we have
SELECT id, name, email, role FROM users ORDER BY name;

-- Update each user with their real UUID (replace with actual UUIDs from Supabase Auth)
-- You'll need to get these UUIDs from your Supabase Dashboard → Authentication → Users

-- Example updates (replace with real UUIDs):
-- UPDATE users SET id = 'real-uuid-from-auth-1' WHERE email = 'admin@ntsgrow.com';
-- UPDATE users SET id = 'real-uuid-from-auth-2' WHERE email = 'marco@ntsgrow.com';
-- UPDATE users SET id = 'real-uuid-from-auth-3' WHERE email = 'alan@ntsgrow.com';
-- UPDATE users SET id = 'real-uuid-from-auth-4' WHERE email = 'adriano@ntsgrow.com';
-- UPDATE users SET id = 'real-uuid-from-auth-5' WHERE email = 'fred@ntsgrow.com';
-- UPDATE users SET id = 'real-uuid-from-auth-6' WHERE email = 'karl@ntsgrow.com';

-- After updating users, update field trials to use the new UUIDs
-- UPDATE field_trials SET responsible_agronomist_id = 'real-uuid-from-auth-6' 
-- WHERE responsible_agronomist_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

-- Verify the updates
SELECT id, name, email, role FROM users ORDER BY name; 