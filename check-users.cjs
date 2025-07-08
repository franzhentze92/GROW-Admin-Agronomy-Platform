const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUsers() {
  console.log('🔍 Checking current users...\n');

  try {
    // Check public.users table
    console.log('1️⃣ Checking public.users table...');
    const { data: publicUsers, error: publicError } = await supabase
      .from('users')
      .select('*');

    if (publicError) {
      console.error('❌ Error fetching public users:', publicError);
    } else {
      console.log('📋 Public users:', JSON.stringify(publicUsers, null, 2));
    }

    // Check auth.users table (if accessible)
    console.log('\n2️⃣ Checking auth.users table...');
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
      console.log('⚠️ Cannot access auth.users (requires admin key):', authError.message);
    } else {
      console.log('📋 Auth users:', JSON.stringify(authUsers, null, 2));
    }

    // Check field trials with mock UUIDs
    console.log('\n3️⃣ Checking field trials for mock UUIDs...');
    const { data: trials, error: trialsError } = await supabase
      .from('field_trials')
      .select('id, name, responsible_agronomist_id')
      .eq('responsible_agronomist_id', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

    if (trialsError) {
      console.error('❌ Error fetching trials:', trialsError);
    } else {
      console.log('🔍 Trials with mock UUID:', JSON.stringify(trials, null, 2));
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

checkUsers(); 