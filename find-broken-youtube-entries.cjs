const fs = require('fs');

const file = 'processed-videos.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const broken = data.videos.filter(video =>
  video.source === 'YouTube' &&
  (!video.youtube_video_id || typeof video.youtube_video_id !== 'string' || video.youtube_video_id.length !== 11)
);

if (broken.length === 0) {
  console.log('No broken YouTube entries found!');
} else {
  console.log(`Found ${broken.length} broken YouTube entries:`);
  broken.forEach(video => {
    console.log(`Title: ${video.title}`);
    console.log(`  youtube_video_id: ${video.youtube_video_id}`);
    console.log(`  preview_link: ${video.preview_link}`);
    console.log(`  id: ${video.id}`);
    console.log('---');
  });
} 