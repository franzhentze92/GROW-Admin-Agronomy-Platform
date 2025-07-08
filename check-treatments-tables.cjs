const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTreatmentsTables() {
  console.log('🔍 Checking field trial treatments and variables tables...\n');

  try {
    // Check if field_trial_treatments table exists
    console.log('1️⃣ Checking field_trial_treatments table...');
    const { data: treatmentsData, error: treatmentsError } = await supabase
      .from('field_trial_treatments')
      .select('*')
      .limit(1);

    if (treatmentsError) {
      console.log('❌ field_trial_treatments error:', treatmentsError.message);
      
      // Try to get table info
      const { data: tableInfo, error: tableError } = await supabase
        .rpc('get_table_info', { table_name: 'field_trial_treatments' })
        .single();
      
      if (tableError) {
        console.log('❌ Could not get table info:', tableError.message);
      } else {
        console.log('📋 Table info:', tableInfo);
      }
    } else {
      console.log('✅ field_trial_treatments accessible');
      console.log('   Sample record:', treatmentsData);
    }

    // Check if field_trial_variables table exists
    console.log('\n2️⃣ Checking field_trial_variables table...');
    const { data: variablesData, error: variablesError } = await supabase
      .from('field_trial_variables')
      .select('*')
      .limit(1);

    if (variablesError) {
      console.log('❌ field_trial_variables error:', variablesError.message);
    } else {
      console.log('✅ field_trial_variables accessible');
      console.log('   Sample record:', variablesData);
    }

    // Check if we can create a test treatment
    console.log('\n3️⃣ Testing treatment creation...');
    const { data: testTrial } = await supabase
      .from('field_trials')
      .select('id')
      .limit(1)
      .single();

    if (testTrial) {
      const testTreatment = {
        trial_id: testTrial.id,
        name: 'Test Treatment',
        description: 'Test description',
        application_method: 'Foliar',
        rate: '2L/ha',
        timing: 'Pre-flower'
      };

      const { data: createdTreatment, error: createError } = await supabase
        .from('field_trial_treatments')
        .insert([testTreatment])
        .select()
        .single();

      if (createError) {
        console.log('❌ Could not create test treatment:', createError.message);
      } else {
        console.log('✅ Test treatment created successfully:', createdTreatment.id);
        
        // Clean up
        await supabase
          .from('field_trial_treatments')
          .delete()
          .eq('id', createdTreatment.id);
        console.log('✅ Test treatment cleaned up');
      }
    } else {
      console.log('❌ No trials found to test with');
    }

    // Check RLS policies
    console.log('\n4️⃣ Checking RLS policies...');
    const { data: policies, error: policiesError } = await supabase
      .from('information_schema.policies')
      .select('*')
      .eq('table_name', 'field_trial_treatments');

    if (policiesError) {
      console.log('❌ Could not check policies:', policiesError.message);
    } else {
      console.log('📋 RLS Policies for field_trial_treatments:');
      policies.forEach(policy => {
        console.log(`   - ${policy.policy_name}: ${policy.permissive ? 'PERMISSIVE' : 'RESTRICTIVE'} ${policy.cmd}`);
      });
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

checkTreatmentsTables(); 