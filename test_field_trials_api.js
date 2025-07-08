// Test Field Trials API
// Run this in your browser console to test the API

async function testFieldTrialsAPI() {
  console.log('🧪 Testing Field Trials API...');
  
  try {
    // Test 1: Get all trials
    console.log('📋 Test 1: Getting all trials...');
    const trials = await fieldTrialsApi.getFieldTrials();
    console.log(`✅ Found ${trials.length} trials:`, trials.map(t => t.name));
    
    // Test 2: Get a specific trial
    if (trials.length > 0) {
      console.log('🔍 Test 2: Getting specific trial...');
      const trial = await fieldTrialsApi.getFieldTrial(trials[0].id);
      console.log('✅ Trial details:', trial);
    }
    
    // Test 3: Generate trial code
    console.log('🔢 Test 3: Generating trial code...');
    const newCode = await fieldTrialsApi.generateTrialCode();
    console.log('✅ Generated code:', newCode);
    
    console.log('🎉 All API tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ API test failed:', error);
    return false;
  }
}

// Run the test
testFieldTrialsAPI(); 