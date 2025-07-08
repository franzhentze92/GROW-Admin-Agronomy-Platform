const fs = require('fs');

// Read the scraped YouTube titles
const youtubeTitles = JSON.parse(fs.readFileSync('youtube_video_titles.json', 'utf8'));

// Read existing processed videos
let existingVideos = [];
try {
  const existingData = JSON.parse(fs.readFileSync('processed-videos.json', 'utf8'));
  existingVideos = existingData.videos || [];
  console.log(`Found ${existingVideos.length} existing videos`);
} catch (error) {
  console.log('No existing processed-videos.json found, starting fresh');
}

// Function to extract series and episode info from title
function extractSeriesInfo(title) {
  let series = 'Graeme\'s Exclusives';
  let season = null;
  let episode = null;
  
  // Check for "How to Do It Series" patterns
  if (title.includes('How to Do It Series')) {
    series = 'How to Do It Series';
    
    // Extract season and episode
    const seasonMatch = title.match(/Series\s*(\d+)/i);
    if (seasonMatch) {
      season = parseInt(seasonMatch[1]);
    }
    
    const episodeMatch = title.match(/Episode\s*(\d+)/i);
    if (episodeMatch) {
      episode = parseInt(episodeMatch[1]);
    }
  }
  // Check for "How to S3E" patterns (Season 3)
  else if (title.includes('How to S3E')) {
    series = 'How to Do It Series';
    season = 3;
    
    const episodeMatch = title.match(/S3E(\d+)/i);
    if (episodeMatch) {
      episode = parseInt(episodeMatch[1]);
    }
  }
  // Check for "Gold from the Vaults"
  else if (title.includes('Gold from the Vaults')) {
    series = 'Gold from the Vaults';
    
    const episodeMatch = title.match(/Episode\s*(\d+)/i);
    if (episodeMatch) {
      episode = parseInt(episodeMatch[1]);
    }
  }
  // Check for "CARBONPOWER22"
  else if (title.includes('CARBONPOWER22')) {
    series = 'CARBONPOWER22';
  }
  // Check for interview content
  else if (title.includes('Interview') || title.includes('Graeme Sait Interviews')) {
    series = 'Interviews';
  }
  
  return { series, season, episode };
}

// Convert YouTube videos to the same format as existing videos
const youtubeVideos = youtubeTitles.map(video => {
  const { series, season, episode } = extractSeriesInfo(video.title);
  
  return {
    id: video.id,
    title: video.title,
    language: 'English',
    season: season,
    episode: episode,
    series: series,
    folder_path: `${series}/Season ${season || 'Unknown'}/Episode ${episode || 'Unknown'}`,
    original_name: `${video.title}.mp4`,
    google_drive_file_id: null, // YouTube videos don't have Google Drive IDs
    preview_link: video.url,
    download_link: video.url,
    mime_type: 'video/mp4',
    thumbnail_url: null, // No custom thumbnails for YouTube videos
    source: 'YouTube',
    status: 'active'
  };
});

// Merge with existing videos, avoiding duplicates
const allVideos = [...existingVideos];

youtubeVideos.forEach(youtubeVideo => {
  // Check if video already exists (by ID or URL)
  const exists = allVideos.some(existing => 
    existing.id === youtubeVideo.id || 
    existing.preview_link === youtubeVideo.preview_link
  );
  
  if (!exists) {
    allVideos.push(youtubeVideo);
  }
});

// Save merged results in the same format as original
const mergedData = {
  videos: allVideos
};

fs.writeFileSync('processed-videos-with-youtube.json', JSON.stringify(mergedData, null, 2));

// Create a summary
const summary = {
  totalVideos: allVideos.length,
  existingVideos: existingVideos.length,
  newYouTubeVideos: youtubeVideos.length,
  seriesBreakdown: {},
  languageBreakdown: {}
};

// Count videos by series and language
allVideos.forEach(video => {
  const series = video.series || 'Unknown';
  const language = video.language || 'Unknown';
  summary.seriesBreakdown[series] = (summary.seriesBreakdown[series] || 0) + 1;
  summary.languageBreakdown[language] = (summary.languageBreakdown[language] || 0) + 1;
});

console.log('=== MERGE COMPLETE ===');
console.log(`Total videos: ${summary.totalVideos}`);
console.log(`Existing videos: ${summary.existingVideos}`);
console.log(`New YouTube videos: ${summary.newYouTubeVideos}`);
console.log('\n=== SERIES BREAKDOWN ===');
Object.entries(summary.seriesBreakdown).forEach(([series, count]) => {
  console.log(`${series}: ${count} videos`);
});

console.log('\n=== LANGUAGE BREAKDOWN ===');
Object.entries(summary.languageBreakdown).forEach(([language, count]) => {
  console.log(`${language}: ${count} videos`);
});

console.log('\nResults saved to: processed-videos-with-youtube.json');

// Also create a CSV export for easy viewing
const csvHeaders = 'ID,Title,Language,Series,Season,Episode,URL,Source,Status\n';
const csvContent = allVideos.map(video => 
  `"${video.id}","${video.title.replace(/"/g, '""')}","${video.language}","${video.series || ''}","${video.season || ''}","${video.episode || ''}","${video.preview_link}","${video.source || 'Google Drive'}","${video.status}"`
).join('\n');

fs.writeFileSync('processed-videos-with-youtube.csv', csvHeaders + csvContent);
console.log('Results also saved to: processed-videos-with-youtube.csv'); 