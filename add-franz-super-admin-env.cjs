const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- VITE_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nPlease add these to your .env.local file');
  console.error('You can get the service role key from your Supabase dashboard > Settings > API');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Super admin user to create
const superAdminUser = {
  name: 'Franz Hentze',
  email: 'franz@nutri-tech.com.au',
  role: 'super-admin',
  password: 'FranzSuperAdmin123!' // They can change this later
};

async function addFranzSuperAdmin() {
  console.log('🔧 Adding Franz as Super Admin user to Supabase Auth...\n');

  try {
    console.log(`📝 Creating Super Admin: ${superAdminUser.name} (${superAdminUser.email})`);
    
    // Create user in Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: superAdminUser.email,
      password: superAdminUser.password,
      email_confirm: true,
      user_metadata: {
        name: superAdminUser.name,
        role: superAdminUser.role
      }
    });

    if (authError) {
      console.error(`❌ Failed to create Super Admin user:`, authError.message);
      return;
    }

    console.log(`✅ Created Super Admin auth user: ${authUser.user.id}`);

    // Insert into the public.users table
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: authUser.user.id,
        name: superAdminUser.name,
        email: superAdminUser.email,
        role: superAdminUser.role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (insertError) {
      console.error(`❌ Failed to insert into public.users:`, insertError.message);
    } else {
      console.log(`✅ Added Super Admin to public.users table`);
    }

    console.log('\n🎉 Franz Super Admin user creation completed!');
    console.log('\n📋 Login Details:');
    console.log(`Email: ${superAdminUser.email}`);
    console.log(`Password: ${superAdminUser.password}`);
    console.log('\n⚠️  Important: The user should change their password on first login!');

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

addFranzSuperAdmin(); 