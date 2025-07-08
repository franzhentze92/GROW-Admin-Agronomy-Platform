const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testTrialCreation() {
  console.log('🧪 Testing trial creation process...\n');

  try {
    // Simulate the exact data structure from the React form
    const trialData = {
      name: 'Test Multiple Agronomists',
      trial_code: 'TEST-MULTI-' + Date.now(),
      crop: 'Wheat',
      variety_hybrid: '',
      trial_type: 'Nutrient Rate Test',
      season: '2024',
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      status: 'planned',
      objective: 'Test multiple agronomists',
      farm_name: 'Test Farm',
      field_location: 'Test Field',
      gps_coordinates: '',
      trial_area: 0,
      responsible_agronomist_ids: ['11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222'],
      tasks: [],
      notifications_enabled: false,
      attachments: [],
      tags: [],
      trial_category: '',
      budget: 0,
      is_draft: true
    };

    console.log('📝 Trial data to insert:', JSON.stringify(trialData, null, 2));

    // Step 1: Insert the trial (simulating the API)
    console.log('\n1️⃣ Inserting trial...');
    const { data: insertResult, error: insertError } = await supabase
      .from('field_trials')
      .insert([trialData]);

    if (insertError) {
      console.error('❌ Insert failed:', insertError);
      return;
    }

    console.log('✅ Insert successful');

    // Step 2: Fetch the created trial by trial_code (simulating the API fetch)
    console.log('\n2️⃣ Fetching created trial by trial_code...');
    const { data: createdTrial, error: fetchError } = await supabase
      .from('field_trials')
      .select('*')
      .eq('trial_code', trialData.trial_code)
      .single();

    if (fetchError) {
      console.error('❌ Fetch failed:', fetchError);
    } else {
      console.log('✅ Fetch successful:', createdTrial.id);
      console.log('   responsible_agronomist_ids:', createdTrial.responsible_agronomist_ids);
    }

    // Clean up
    console.log('\n3️⃣ Cleaning up...');
    await supabase.from('field_trials').delete().eq('id', createdTrial.id);
    console.log('✅ Cleanup complete');

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

testTrialCreation(); 