const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with the same configuration as React app
const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testReactExact() {
  console.log('🔍 Testing exact React app request...\n');

  try {
    // Simulate the exact data that might be coming from the React form
    const trialData = {
      name: 'React Form Trial',
      trial_code: 'FORM-' + Date.now(),
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

    console.log('📝 Trial data:', JSON.stringify(trialData, null, 2));

    // Test the exact same insert pattern as the React app
    console.log('\n🚀 Testing insert with select...');
    
    // This is the pattern that might be causing the columns parameter
    const { data, error } = await supabase
      .from('field_trials')
      .insert([trialData])
      .select('*')
      .single();

    if (error) {
      console.error('❌ Insert failed:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    } else {
      console.log('✅ Insert successful:', data.id);
      
      // Clean up
      await supabase
        .from('field_trials')
        .delete()
        .eq('id', data.id);
      console.log('✅ Trial cleaned up');
    }

    // Test without select to see if that's the issue
    console.log('\n🚀 Testing insert without select...');
    const { data: data2, error: error2 } = await supabase
      .from('field_trials')
      .insert([trialData]);

    if (error2) {
      console.error('❌ Insert without select failed:', error2);
    } else {
      console.log('✅ Insert without select successful');
      
      // Try to fetch the inserted data
      const { data: fetched, error: fetchError } = await supabase
        .from('field_trials')
        .select('*')
        .eq('trial_code', trialData.trial_code)
        .single();
      
      if (fetchError) {
        console.error('❌ Fetch failed:', fetchError);
      } else {
        console.log('✅ Fetched trial:', fetched.id);
        
        // Clean up
        await supabase
          .from('field_trials')
          .delete()
          .eq('id', fetched.id);
        console.log('✅ Trial cleaned up');
      }
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

testReactExact(); 