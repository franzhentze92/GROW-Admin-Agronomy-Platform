const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');

const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjU3NjQsImV4cCI6MjA2NjEwMTc2NH0.UuvAnQ30yCa9l1SVCOTJPiZ-zPuo7xkVCi6Fjqducc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateProperUUIDs() {
  console.log('🔧 Generating proper UUIDs for users...\n');

  try {
    // Get current users
    const { data: users, error: fetchError } = await supabase
      .from('users')
      .select('*');

    if (fetchError) {
      console.error('❌ Error fetching users:', fetchError);
      return;
    }

    console.log('📋 Current users with mock UUIDs:');
    users.forEach(user => {
      console.log(`  ${user.name} (${user.email}): ${user.id}`);
    });

    // Generate new UUIDs and update users
    for (const user of users) {
      const newUuid = uuidv4();
      console.log(`\n🔄 Updating ${user.name}...`);
      console.log(`  Old UUID: ${user.id}`);
      console.log(`  New UUID: ${newUuid}`);

      // Update the user with new UUID
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          id: newUuid,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        console.error(`❌ Failed to update ${user.name}:`, updateError.message);
      } else {
        console.log(`✅ Updated ${user.name} with new UUID`);
      }
    }

    // Update field trials to use the new UUID for Karl Holland
    console.log('\n🔄 Updating field trials...');
    const { data: karlUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', 'karl@ntsgrow.com')
      .single();

    if (karlUser) {
      const { error: trialUpdateError } = await supabase
        .from('field_trials')
        .update({ responsible_agronomist_id: karlUser.id })
        .eq('responsible_agronomist_id', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

      if (trialUpdateError) {
        console.error('❌ Failed to update field trials:', trialUpdateError.message);
      } else {
        console.log('✅ Updated field trials with new UUID');
      }
    }

    console.log('\n🎉 UUID cleanup completed!');
    console.log('\n📋 Verification:');
    
    // Show updated users
    const { data: updatedUsers } = await supabase
      .from('users')
      .select('*');

    console.log('\nUpdated users:');
    updatedUsers.forEach(user => {
      console.log(`  ${user.name}: ${user.id}`);
    });

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

generateProperUUIDs(); 