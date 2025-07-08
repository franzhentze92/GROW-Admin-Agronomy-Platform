const fs = require('fs');

// Read the processed videos
const data = JSON.parse(fs.readFileSync('public/processed-videos.json', 'utf8'));

console.log(`Total videos: ${data.videos.length}`);

// Count by source
const bySource = {};
const byLanguage = {};
const bySeries = {};

data.videos.forEach(video => {
  const source = video.source || 'Google Drive';
  const language = video.language || 'Unknown';
  const series = video.series || 'Unknown';
  
  bySource[source] = (bySource[source] || 0) + 1;
  byLanguage[language] = (byLanguage[language] || 0) + 1;
  bySeries[series] = (bySeries[series] || 0) + 1;
});

console.log('\n=== BY SOURCE ===');
Object.entries(bySource).forEach(([source, count]) => {
  console.log(`${source}: ${count}`);
});

console.log('\n=== BY LANGUAGE ===');
Object.entries(byLanguage).forEach(([language, count]) => {
  console.log(`${language}: ${count}`);
});

console.log('\n=== BY SERIES ===');
Object.entries(bySeries).forEach(([series, count]) => {
  console.log(`${series}: ${count}`);
});

// Check YouTube videos specifically
const youtubeVideos = data.videos.filter(v => v.source === 'YouTube');
console.log(`\n=== YOUTUBE VIDEOS (${youtubeVideos.length}) ===`);
youtubeVideos.slice(0, 5).forEach(video => {
  console.log(`- ${video.title} (${video.language}) - Series: ${video.series}`);
});

// Check if any videos are missing required properties
const missingProps = data.videos.filter(v => !v.language || !v.title);
console.log(`\n=== VIDEOS WITH MISSING PROPERTIES (${missingProps.length}) ===`);
missingProps.slice(0, 3).forEach(video => {
  console.log(`- ID: ${video.id}, Title: ${video.title}, Language: ${video.language}`);
}); 