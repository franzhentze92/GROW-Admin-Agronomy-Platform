const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- VITE_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupFieldTrials() {
  try {
    console.log('Setting up Field Trials database...');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, 'supabase_field_trials_setup.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute the SQL
    const { error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error('Error executing SQL:', error);
      
      // Fallback: try to execute the SQL directly
      console.log('Trying alternative approach...');
      const { error: directError } = await supabase.from('field_trials').select('count').limit(1);
      
      if (directError) {
        console.error('Field trials table does not exist. Please run the SQL manually in your Supabase dashboard.');
        console.log('SQL to run:');
        console.log(sql);
      } else {
        console.log('Field trials table already exists!');
      }
    } else {
      console.log('✅ Field Trials database setup completed successfully!');
    }
    
  } catch (error) {
    console.error('Setup failed:', error);
    console.log('\nPlease run the following SQL manually in your Supabase SQL Editor:');
    console.log('=====================================');
    const sqlPath = path.join(__dirname, 'supabase_field_trials_setup.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    console.log(sql);
    console.log('=====================================');
  }
}

setupFieldTrials(); 