const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugReactTrial() {
  console.log('🔍 Debugging React trial creation...\n');

  try {
    // Simulate the exact data structure that might be coming from the React form
    const reactTrialData = {
      name: 'React Test Trial',
      trial_code: 'REACT-' + Date.now(),
      crop: 'Corn',
      variety_hybrid: 'Test Variety',
      trial_type: 'product_evaluation',
      season: '2024',
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      status: 'planned',
      objective: 'Test objective from React',
      farm_name: 'Test Farm',
      field_location: 'Test Field',
      gps_coordinates: null,
      trial_area: null,
      responsible_agronomist_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      tags: [],
      trial_category: null,
      budget: null,
      spent: 0,
      completion_percentage: 0,
      notifications_enabled: false,
      is_draft: true
    };

    console.log('📝 React trial data:', JSON.stringify(reactTrialData, null, 2));

    // Test 1: Direct insert without any processing
    console.log('\n1️⃣ Testing direct insert...');
    const { data: directData, error: directError } = await supabase
      .from('field_trials')
      .insert([reactTrialData])
      .select()
      .single();

    if (directError) {
      console.error('❌ Direct insert failed:', directError);
    } else {
      console.log('✅ Direct insert successful:', directData.id);
      
      // Clean up
      await supabase
        .from('field_trials')
        .delete()
        .eq('id', directData.id);
      console.log('✅ Direct trial cleaned up');
    }

    // Test 2: Try with minimal required fields only
    console.log('\n2️⃣ Testing minimal fields...');
    const minimalTrialData = {
      name: 'Minimal React Trial',
      trial_code: 'MIN-' + Date.now(),
      crop: 'Corn',
      trial_type: 'product_evaluation',
      season: '2024',
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      status: 'planned',
      objective: 'Minimal test',
      farm_name: 'Test Farm',
      field_location: 'Test Field',
      responsible_agronomist_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
    };

    const { data: minimalResult, error: minimalError } = await supabase
      .from('field_trials')
      .insert([minimalTrialData])
      .select()
      .single();

    if (minimalError) {
      console.error('❌ Minimal insert failed:', minimalError);
    } else {
      console.log('✅ Minimal insert successful:', minimalResult.id);
      
      // Clean up
      await supabase
        .from('field_trials')
        .delete()
        .eq('id', minimalResult.id);
      console.log('✅ Minimal trial cleaned up');
    }

    // Test 3: Check if there are any RLS policies affecting this
    console.log('\n3️⃣ Checking RLS status...');
    const { data: rlsCheck, error: rlsError } = await supabase
      .from('field_trials')
      .select('count')
      .limit(1);

    if (rlsError) {
      console.error('❌ RLS check failed:', rlsError);
    } else {
      console.log('✅ RLS check passed - table is accessible');
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

debugReactTrial(); 