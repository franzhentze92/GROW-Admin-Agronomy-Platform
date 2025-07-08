const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- VITE_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nPlease add these to your .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupCoursesDatabase() {
  try {
    console.log('Setting up Courses database...');
    
    // Read the SQL file
    const sql = fs.readFileSync('courses_setup.sql', 'utf8');
    
    // Execute the SQL using rpc
    const { error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error('Error executing SQL:', error);
      console.log('\nTrying alternative approach...');
      
      // Try to create the tables directly
      console.log('Checking if courses table exists...');
      const { error: checkError } = await supabase
        .from('courses')
        .select('count')
        .limit(1);
      
      if (checkError) {
        console.error('Courses table does not exist. Please run this SQL manually in your Supabase dashboard:');
        console.log('\n' + '='.repeat(50));
        console.log(sql);
        console.log('='.repeat(50));
      } else {
        console.log('✅ Courses database already exists!');
      }
    } else {
      console.log('✅ Courses database setup completed successfully!');
    }
    
  } catch (error) {
    console.error('Setup failed:', error);
    console.log('\nPlease run this SQL manually in your Supabase SQL Editor:');
    console.log('\n' + '='.repeat(50));
    const sql = fs.readFileSync('courses_setup.sql', 'utf8');
    console.log(sql);
    console.log('='.repeat(50));
  }
}

setupCoursesDatabase(); 