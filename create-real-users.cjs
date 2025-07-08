const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

// Mock users to replace with real ones
const mockUsers = [
  {
    mockId: '11111111-1111-1111-1111-111111111111',
    name: 'Admin User',
    email: 'admin@ntsgrow.com',
    role: 'admin'
  },
  {
    mockId: '22222222-2222-2222-2222-222222222222',
    name: 'Marco Giorgio',
    email: 'marco@ntsgrow.com',
    role: 'agronomist'
  },
  {
    mockId: '33333333-3333-3333-3333-333333333333',
    name: 'Alan Montalbetti',
    email: 'alan@ntsgrow.com',
    role: 'agronomist'
  },
  {
    mockId: '44444444-4444-4444-4444-444444444444',
    name: 'Adriano de Senna',
    email: 'adriano@ntsgrow.com',
    role: 'agronomist'
  },
  {
    mockId: '55555555-5555-5555-5555-555555555555',
    name: 'Fred Ghorbson',
    email: 'fred@ntsgrow.com',
    role: 'agronomist'
  },
  {
    mockId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'Karl Holland',
    email: 'karl@ntsgrow.com',
    role: 'agronomist'
  }
];

async function createRealUsers() {
  console.log('🔧 Creating real Supabase Auth users...\n');

  try {
    for (const user of mockUsers) {
      console.log(`📝 Creating user: ${user.name} (${user.email})`);
      
      // Create user in Supabase Auth
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: 'TemporaryPassword123!', // They can change this later
        email_confirm: true,
        user_metadata: {
          name: user.name,
          role: user.role
        }
      });

      if (authError) {
        console.error(`❌ Failed to create auth user for ${user.email}:`, authError.message);
        continue;
      }

      console.log(`✅ Created auth user: ${authUser.user.id}`);

      // Update the public.users table with the real UUID
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          id: authUser.user.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.mockId);

      if (updateError) {
        console.error(`❌ Failed to update public.users for ${user.email}:`, updateError.message);
      } else {
        console.log(`✅ Updated public.users with real UUID: ${authUser.user.id}`);
      }

      console.log('---');
    }

    console.log('🎉 User creation process completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Users should check their email and set a new password');
    console.log('2. Update field trials to use real UUIDs');
    console.log('3. Delete old mock UUIDs');

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

createRealUsers(); 