const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
  console.log('🔍 Testing authentication and table access...\n');

  try {
    // Test 1: Check if we can access field_trials
    console.log('1️⃣ Testing field_trials access...');
    const { data: trials, error: trialsError } = await supabase
      .from('field_trials')
      .select('id, name')
      .limit(1);

    if (trialsError) {
      console.log('❌ field_trials error:', trialsError.message);
    } else {
      console.log('✅ field_trials accessible:', trials);
    }

    // Test 2: Check if we can access field_trial_treatments
    console.log('\n2️⃣ Testing field_trial_treatments access...');
    const { data: treatments, error: treatmentsError } = await supabase
      .from('field_trial_treatments')
      .select('*')
      .limit(1);

    if (treatmentsError) {
      console.log('❌ field_trial_treatments error:', treatmentsError.message);
    } else {
      console.log('✅ field_trial_treatments accessible:', treatments);
    }

    // Test 3: Check if we can access field_trial_variables
    console.log('\n3️⃣ Testing field_trial_variables access...');
    const { data: variables, error: variablesError } = await supabase
      .from('field_trial_variables')
      .select('*')
      .limit(1);

    if (variablesError) {
      console.log('❌ field_trial_variables error:', variablesError.message);
    } else {
      console.log('✅ field_trial_variables accessible:', variables);
    }

    // Test 4: Check current user session
    console.log('\n4️⃣ Checking current user session...');
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.log('❌ User session error:', userError.message);
    } else if (user) {
      console.log('✅ User authenticated:', user.id);
    } else {
      console.log('⚠️ No user authenticated (using anon key)');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

testAuth(); 