-- Fix the reading lesson by adding reading content
UPDATE lessons 
SET content = '{"readingContent": "This is a sample reading lesson content. You can replace this with your actual lesson text. This lesson covers important concepts and provides detailed information for your learning journey."}'
WHERE id = 'd6aeca39-18dd-47f9-a7d5-2e64f1324791' 
AND type = 'reading'; 