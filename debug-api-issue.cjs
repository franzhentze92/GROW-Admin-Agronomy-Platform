const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugApiIssue() {
  console.log('🔍 Debugging API issue...\n');

  try {
    // Test 1: Check if table exists
    console.log('1️⃣ Testing if field_trials table exists...');
    const { data: tableTest, error: tableError } = await supabase
      .from('field_trials')
      .select('count')
      .limit(1);

    if (tableError) {
      console.error('❌ Table access error:', tableError);
      return;
    }
    console.log('✅ Table exists and is accessible');

    // Test 2: Check table structure
    console.log('\n2️⃣ Checking table structure...');
    const { data: structure, error: structureError } = await supabase
      .from('field_trials')
      .select('*')
      .limit(1);

    if (structureError) {
      console.error('❌ Structure check error:', structureError);
    } else {
      console.log('✅ Table structure check passed');
      console.log('   Available columns:', Object.keys(structure[0] || {}));
    }

    // Test 3: Try a minimal insert
    console.log('\n3️⃣ Testing minimal insert...');
    const minimalTrial = {
      name: 'Debug Test',
      trial_code: 'DEBUG-' + Date.now(),
      crop: 'Corn',
      trial_type: 'Test',
      season: '2024',
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      status: 'planned',
      objective: 'Debug test',
      farm_name: 'Test Farm',
      field_location: 'Test Field'
    };

    const { data: insertResult, error: insertError } = await supabase
      .from('field_trials')
      .insert([minimalTrial]);

    if (insertError) {
      console.error('❌ Minimal insert failed:', insertError);
      console.log('💡 This suggests a fundamental issue with the table or permissions');
    } else {
      console.log('✅ Minimal insert successful');
      
      // Clean up
      await supabase.from('field_trials').delete().eq('trial_code', minimalTrial.trial_code);
      console.log('✅ Cleanup complete');
    }

    // Test 4: Check RLS policies
    console.log('\n4️⃣ Checking if RLS might be blocking...');
    const { data: rlsTest, error: rlsError } = await supabase
      .from('field_trials')
      .select('id, name')
      .limit(5);

    if (rlsError) {
      console.error('❌ RLS might be blocking:', rlsError);
    } else {
      console.log('✅ RLS check passed, found', rlsTest?.length || 0, 'trials');
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

debugApiIssue(); 