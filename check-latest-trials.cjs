const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLatestTrials() {
  console.log('🔍 Checking latest field trials...\n');

  try {
    const { data: trials, error } = await supabase
      .from('field_trials')
      .select('id, name, trial_code, responsible_agronomist_id, responsible_agronomist_ids, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('❌ Error fetching trials:', error);
      return;
    }

    console.log('📋 Latest 5 trials:');
    trials.forEach((trial, index) => {
      console.log(`\n${index + 1}. ${trial.name} (${trial.trial_code})`);
      console.log(`   ID: ${trial.id}`);
      console.log(`   Created: ${trial.created_at}`);
      console.log(`   responsible_agronomist_id: ${trial.responsible_agronomist_id || 'NULL'}`);
      console.log(`   responsible_agronomist_ids: ${JSON.stringify(trial.responsible_agronomist_ids || [])}`);
    });

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

checkLatestTrials(); 