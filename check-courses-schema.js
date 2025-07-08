const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function checkCoursesTable() {
  try {
    // Get a sample course to see the structure
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error fetching courses:', error);
      return;
    }

    if (data && data.length > 0) {
      console.log('Courses table fields:', Object.keys(data[0]));
      console.log('Sample course data:', JSON.stringify(data[0], null, 2));
    } else {
      console.log('No courses found in database');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

checkCoursesTable(); 