const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

// Simulate the generateTrialCode function
async function generateTrialCode() {
  const { data } = await supabase
    .from('field_trials')
    .select('trial_code')
    .order('created_at', { ascending: false })
    .limit(1);

  const lastCode = data?.[0]?.trial_code || 'TRIAL-0000';
  
  // Handle cases where the last code might not be in the expected format
  if (!lastCode.includes('-')) {
    return `TRIAL-0001`;
  }
  
  const parts = lastCode.split('-');
  if (parts.length < 2) {
    return `TRIAL-0001`;
  }
  
  const lastNumber = parseInt(parts[1]) || 0;
  const newNumber = lastNumber + 1;
  return `TRIAL-${newNumber.toString().padStart(4, '0')}`;
}

async function testTrialCodeFix() {
  console.log('🧪 Testing trial code generation fix...\n');

  try {
    // Test 1: Generate a trial code
    console.log('1️⃣ Generating trial code...');
    const trialCode = await generateTrialCode();
    console.log('   Generated trial code:', trialCode);

    // Test 2: Create trial with empty trial_code (should auto-generate)
    console.log('\n2️⃣ Testing trial creation with empty trial_code...');
    const trialData = {
      name: 'Test Auto Trial Code',
      trial_code: '', // Empty - should auto-generate
      crop: 'Wheat',
      variety_hybrid: '',
      trial_type: 'Nutrient Rate Test',
      season: '2024',
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      status: 'planned',
      objective: 'Test auto trial code',
      farm_name: 'Test Farm',
      field_location: 'Test Field',
      gps_coordinates: '',
      trial_area: 0,
      responsible_agronomist_ids: ['11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222'],
      tags: [],
      trial_category: '',
      budget: 0,
      spent: 0,
      completion_percentage: 0,
      notifications_enabled: false,
      is_draft: true
    };

    // Simulate the API cleaning process
    const cleanTrialData = {
      name: trialData.name,
      trial_code: trialData.trial_code || await generateTrialCode(),
      crop: trialData.crop,
      variety_hybrid: trialData.variety_hybrid,
      trial_type: trialData.trial_type,
      season: trialData.season,
      start_date: trialData.start_date,
      end_date: trialData.end_date,
      status: trialData.status,
      objective: trialData.objective,
      farm_name: trialData.farm_name,
      field_location: trialData.field_location,
      gps_coordinates: trialData.gps_coordinates,
      trial_area: trialData.trial_area,
      responsible_agronomist_ids: trialData.responsible_agronomist_ids || [],
      tags: trialData.tags,
      trial_category: trialData.trial_category,
      budget: trialData.budget,
      spent: trialData.spent || 0,
      completion_percentage: trialData.completion_percentage || 0,
      notifications_enabled: trialData.notifications_enabled || false,
      is_draft: trialData.is_draft !== undefined ? trialData.is_draft : true
    };

    console.log('   Cleaned trial data trial_code:', cleanTrialData.trial_code);

    // Test the insert
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
      console.log('   trial_code:', createdTrial.trial_code);
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

testTrialCodeFix(); 