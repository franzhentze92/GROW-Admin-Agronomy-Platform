const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testExactFormData() {
  console.log('🧪 Testing exact form data structure...\n');

  try {
    // Simulate the exact data structure from React form
    const formData = {
      name: 'Test Form Data',
      trial_code: '',
      crop: 'Wheat',
      variety_hybrid: '',
      trial_type: 'Nutrient Rate Test',
      season: '2024',
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      status: 'planned',
      objective: 'Test objective',
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

    console.log('📝 Original form data:', JSON.stringify(formData, null, 2));

    // Simulate the API cleaning process
    const cleanTrialData = {
      name: formData.name,
      trial_code: formData.trial_code || 'AUTO-' + Date.now(),
      crop: formData.crop,
      variety_hybrid: formData.variety_hybrid,
      trial_type: formData.trial_type,
      season: formData.season,
      start_date: formData.start_date,
      end_date: formData.end_date,
      status: formData.status,
      objective: formData.objective,
      farm_name: formData.farm_name,
      field_location: formData.field_location,
      gps_coordinates: formData.gps_coordinates,
      trial_area: formData.trial_area,
      responsible_agronomist_ids: formData.responsible_agronomist_ids || [],
      tags: formData.tags,
      trial_category: formData.trial_category,
      budget: formData.budget,
      spent: 0,
      completion_percentage: 0,
      notifications_enabled: formData.notifications_enabled || false,
      is_draft: formData.is_draft !== undefined ? formData.is_draft : true
    };

    // Remove undefined values
    Object.keys(cleanTrialData).forEach(key => {
      if (cleanTrialData[key] === undefined) {
        delete cleanTrialData[key];
      }
    });

    console.log('\n🧹 Cleaned trial data:', JSON.stringify(cleanTrialData, null, 2));

    // Test the insert
    console.log('\n🚀 Testing insert...');
    const { data: insertResult, error: insertError } = await supabase
      .from('field_trials')
      .insert([cleanTrialData]);

    if (insertError) {
      console.error('❌ Insert failed:', insertError);
      return;
    }

    console.log('✅ Insert successful');

    // Fetch the created trial
    const { data: createdTrial, error: fetchError } = await supabase
      .from('field_trials')
      .select('*')
      .eq('trial_code', cleanTrialData.trial_code)
      .single();

    if (fetchError) {
      console.error('❌ Fetch failed:', fetchError);
    } else {
      console.log('✅ Fetch successful:', createdTrial.id);
      console.log('   responsible_agronomist_ids:', createdTrial.responsible_agronomist_ids);
      console.log('   Number of agronomists:', createdTrial.responsible_agronomist_ids?.length || 0);
    }

    // Clean up
    await supabase.from('field_trials').delete().eq('id', createdTrial.id);
    console.log('✅ Cleanup complete');

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

testExactFormData(); 