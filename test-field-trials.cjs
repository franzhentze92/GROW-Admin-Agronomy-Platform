const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFieldTrials() {
  console.log('🧪 Testing field trials database access...\n');

  try {
    // Use the test user ID we just created
    const userId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    console.log('✅ Using test user ID:', userId);

    // Test 1: Check if table exists and is accessible
    console.log('1️⃣ Testing basic table access...');
    const { data: tableTest, error: tableError } = await supabase
      .from('field_trials')
      .select('count')
      .limit(1);

    if (tableError) {
      console.error('❌ Table access failed:', tableError);
      return;
    }
    console.log('✅ Table access successful\n');

    // Test 2: Try to fetch all trials
    console.log('2️⃣ Testing fetch all trials...');
    const { data: trials, error: fetchError } = await supabase
      .from('field_trials')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('❌ Fetch trials failed:', fetchError);
      return;
    }
    console.log(`✅ Successfully fetched ${trials?.length || 0} trials\n`);

    // Test 3: Try to create a simple trial
    console.log('3️⃣ Testing trial creation...');
    const testTrial = {
      name: 'Test Trial - ' + new Date().toISOString(),
      trial_code: 'TEST-' + Date.now(),
      crop: 'Corn',
      variety_hybrid: 'Test Variety',
      trial_type: 'product_evaluation',
      season: '2024',
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      status: 'planned',
      objective: 'Test objective',
      farm_name: 'Test Farm',
      field_location: 'Test Field',
      responsible_agronomist_id: userId, // Use the test user ID
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
      return;
    }
    console.log('✅ Trial created successfully:', createdTrial.id);

    // Test 4: Clean up - delete the test trial
    console.log('\n4️⃣ Cleaning up test trial...');
    const { error: deleteError } = await supabase
      .from('field_trials')
      .delete()
      .eq('id', createdTrial.id);

    if (deleteError) {
      console.error('❌ Trial deletion failed:', deleteError);
    } else {
      console.log('✅ Test trial deleted successfully');
    }

    console.log('\n🎉 All tests passed! The field trials system is working correctly.');

  } catch (error) {
    console.error('💥 Test failed with error:', error);
  }
}

testFieldTrials(); 