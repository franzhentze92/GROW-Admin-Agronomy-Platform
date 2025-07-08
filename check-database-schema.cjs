const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabaseSchema() {
  console.log('🔍 Checking database schema...\n');

  try {
    // Test 1: Check if we can insert a simple trial without the array field
    console.log('1️⃣ Testing simple trial creation...');
    const simpleTrial = {
      name: 'Test Trial - ' + Date.now(),
      trial_code: 'TEST-' + Date.now(),
      crop: 'Corn',
      trial_type: 'Test',
      season: '2024',
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      status: 'planned',
      objective: 'Test objective',
      farm_name: 'Test Farm',
      field_location: 'Test Field',
      notifications_enabled: false,
      is_draft: true
    };

    const { data: simpleResult, error: simpleError } = await supabase
      .from('field_trials')
      .insert([simpleTrial])
      .select()
      .single();

    if (simpleError) {
      console.error('❌ Simple trial creation failed:', simpleError);
    } else {
      console.log('✅ Simple trial created successfully:', simpleResult.id);
      
      // Clean up
      await supabase.from('field_trials').delete().eq('id', simpleResult.id);
      console.log('✅ Test trial cleaned up');
    }

    // Test 2: Check if we can insert with the array field
    console.log('\n2️⃣ Testing trial creation with responsible_agronomist_ids...');
    const arrayTrial = {
      name: 'Array Test Trial - ' + Date.now(),
      trial_code: 'ARRAY-' + Date.now(),
      crop: 'Corn',
      trial_type: 'Test',
      season: '2024',
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      status: 'planned',
      objective: 'Test objective',
      farm_name: 'Test Farm',
      field_location: 'Test Field',
      responsible_agronomist_ids: ['11111111-1111-1111-1111-111111111111'],
      notifications_enabled: false,
      is_draft: true
    };

    const { data: arrayResult, error: arrayError } = await supabase
      .from('field_trials')
      .insert([arrayTrial])
      .select()
      .single();

    if (arrayError) {
      console.error('❌ Array trial creation failed:', arrayError);
      console.log('💡 This suggests the responsible_agronomist_ids column might not exist or have the wrong type');
    } else {
      console.log('✅ Array trial created successfully:', arrayResult.id);
      console.log('   responsible_agronomist_ids:', arrayResult.responsible_agronomist_ids);
      
      // Clean up
      await supabase.from('field_trials').delete().eq('id', arrayResult.id);
      console.log('✅ Array test trial cleaned up');
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

checkDatabaseSchema(); 