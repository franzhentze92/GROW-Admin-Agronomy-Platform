const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log('🔍 Checking database schema...\n');

  try {
    // Check if there are multiple users tables in different schemas
    console.log('1️⃣ Checking for users tables in different schemas...');
    
    // Try public.users
    console.log('   Checking public.users...');
    const { data: publicUsers, error: publicError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (publicError) {
      console.log('   ❌ public.users error:', publicError.message);
    } else {
      console.log('   ✅ public.users accessible');
    }

    // Try auth.users (if it exists)
    console.log('   Checking auth.users...');
    const { data: authUsers, error: authError } = await supabase
      .from('auth.users')
      .select('count')
      .limit(1);
    
    if (authError) {
      console.log('   ❌ auth.users error:', authError.message);
    } else {
      console.log('   ✅ auth.users accessible');
    }

    // Check field_trials table structure
    console.log('\n2️⃣ Checking field_trials table structure...');
    const { data: fieldTrials, error: fieldTrialsError } = await supabase
      .from('field_trials')
      .select('*')
      .limit(1);

    if (fieldTrialsError) {
      console.error('❌ field_trials error:', fieldTrialsError);
    } else {
      console.log('✅ field_trials accessible');
      if (fieldTrials && fieldTrials.length > 0) {
        console.log('   Sample record:', Object.keys(fieldTrials[0]));
      }
    }

    // Try a direct SQL query to check foreign key
    console.log('\n3️⃣ Testing direct foreign key validation...');
    
    // Check if the user exists in the exact table the foreign key references
    const { data: directCheck, error: directError } = await supabase
      .rpc('check_user_exists', { user_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' });

    if (directError) {
      console.log('   ❌ Direct check failed:', directError.message);
      console.log('   This suggests the foreign key might reference a different table');
    } else {
      console.log('   ✅ Direct check result:', directCheck);
    }

    // Alternative: Try to create a trial without the foreign key constraint
    console.log('\n4️⃣ Testing trial creation with minimal data...');
    const minimalTrial = {
      name: 'Minimal Test Trial',
      trial_code: 'MIN-' + Date.now(),
      crop: 'Corn',
      trial_type: 'product_evaluation',
      season: '2024',
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      status: 'planned',
      objective: 'Test',
      farm_name: 'Test Farm',
      field_location: 'Test Field',
      responsible_agronomist_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
    };

    const { data: minimalCreated, error: minimalError } = await supabase
      .from('field_trials')
      .insert([minimalTrial])
      .select()
      .single();

    if (minimalError) {
      console.error('❌ Minimal trial creation failed:', minimalError);
    } else {
      console.log('✅ Minimal trial created successfully:', minimalCreated.id);
      
      // Clean up
      await supabase
        .from('field_trials')
        .delete()
        .eq('id', minimalCreated.id);
      console.log('✅ Minimal trial cleaned up');
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

checkSchema(); 