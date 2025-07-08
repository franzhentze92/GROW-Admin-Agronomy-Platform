const fs = require('fs');

const file = 'processed-videos.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const seenYouTubeIds = new Set();
const seenDriveIds = new Set();

data.videos = data.videos.filter(video => {
  if (video.source === 'YouTube' && video.youtube_video_id) {
    if (seenYouTubeIds.has(video.youtube_video_id)) {
      return false; // duplicate YouTube video
    }
    seenYouTubeIds.add(video.youtube_video_id);
    return true;
  }
  // For Google Drive videos, dedupe by google_drive_file_id if you want
  if (video.google_drive_file_id) {
    if (seenDriveIds.has(video.google_drive_file_id)) {
      return false;
    }
    seenDriveIds.add(video.google_drive_file_id);
    return true;
  }
  // Keep all others
  return true;
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Duplicates removed!'); 