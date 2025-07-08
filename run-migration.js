import { createClient } from '@supabase/supabase-js';

// Supabase configuration (using the same as your app)
const supabaseUrl = 'https://votnfjvhcgomgdcaspnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdG5manZoY2dvbWdkY2FzcG5iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDUyNTc2NCwiZXhwIjoyMDY2MTAxNzY0fQ.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8';
const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  try {
    console.log('Running lesson_progress table migration...');
    
    // Execute the migration SQL directly
    const { error } = await supabase
      .from('lesson_progress')
      .select('id')
      .limit(1);
    
    if (error && error.code === 'PGRST116') {
      // Table doesn't exist, create it
      console.log('Table does not exist, creating lesson_progress table...');
      
      // For now, let's just log that we need to create the table manually
      console.log('Please run the following SQL in your Supabase dashboard:');
      console.log(`
CREATE TABLE IF NOT EXISTS lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    course_id UUID NOT NULL,
    lesson_id UUID NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    quiz_score NUMERIC(5,2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_id, lesson_id)
);
      `);
    } else if (error) {
      console.error('Migration failed:', error);
    } else {
      console.log('✅ lesson_progress table already exists!');
    }
    
  } catch (error) {
    console.error('Error running migration:', error);
  }
}

runMigration(); 