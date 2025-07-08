const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugUsers() {
  console.log('🔍 Debugging users table issue...\n');

  try {
    // Check if the test user exists in the users table
    console.log('1️⃣ Checking if test user exists in users table...');
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')
      .single();

    if (userError) {
      console.error('❌ User not found:', userError);
    } else {
      console.log('✅ User found:', user);
    }

    // Try to create a field trial with an existing user ID from the list
    console.log('\n2️⃣ Testing with existing user ID...');
    const existingUserId = '11111111-1111-1111-1111-111111111111'; // Admin user
    
    const testTrial = {
      name: 'Debug Test Trial',
      trial_code: 'DEBUG-' + Date.now(),
      crop: 'Corn',
      variety_hybrid: 'Test Variety',
      trial_type: 'product_evaluation',
      season: '2024',
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      status: 'planned',
      objective: 'Debug test',
      farm_name: 'Test Farm',
      field_location: 'Test Field',
      responsible_agronomist_id: existingUserId,
      notifications_enabled: false,
      is_draft: true
    };

    const { data: createdTrial, error: createError } = await supabase
      .from('field_trials')
      .insert([testTrial])
      .select()
      .single();

    if (createError) {
      console.error('❌ Trial creation failed:', createError);
    } else {
      console.log('✅ Trial created successfully with existing user:', createdTrial.id);
      
      // Clean up
      await supabase
        .from('field_trials')
        .delete()
        .eq('id', createdTrial.id);
      console.log('✅ Test trial cleaned up');
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

debugUsers(); 