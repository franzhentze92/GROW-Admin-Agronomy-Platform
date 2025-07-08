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

async function createFarmDeliveriesTable() {
  try {
    console.log('Creating farm_deliveries table...');
    
    // Read the SQL file
    const sql = fs.readFileSync('add_farm_deliveries_table.sql', 'utf8');
    
    // Execute the SQL using rpc
    const { error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error('Error executing SQL:', error);
      console.log('\nTrying alternative approach...');
      
      // Try to create the table directly
      const { error: createError } = await supabase
        .from('farm_deliveries')
        .select('count')
        .limit(1);
      
      if (createError) {
        console.error('Table does not exist. Please run this SQL manually in your Supabase dashboard:');
        console.log('\n' + '='.repeat(50));
        console.log(sql);
        console.log('='.repeat(50));
      } else {
        console.log('✅ farm_deliveries table already exists!');
      }
    } else {
      console.log('✅ farm_deliveries table created successfully!');
    }
    
  } catch (error) {
    console.error('Setup failed:', error);
    console.log('\nPlease run this SQL manually in your Supabase SQL Editor:');
    console.log('\n' + '='.repeat(50));
    const sql = fs.readFileSync('add_farm_deliveries_table.sql', 'utf8');
    console.log(sql);
    console.log('='.repeat(50));
  }
}

createFarmDeliveriesTable(); 