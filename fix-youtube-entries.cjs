const fs = require('fs');

const file = 'processed-videos.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

data.videos = data.videos.map(video => {
  // Only process English videos with a YouTube link and no Google Drive file
  if (
    video.language === 'English' &&
    video.preview_link &&
    (video.preview_link.includes('youtube.com') || video.preview_link.includes('youtu.be'))
  ) {
    // Extract YouTube ID
    let idMatch = video.preview_link.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
    let youtubeId = idMatch ? idMatch[1] : null;
    if (youtubeId) {
      return {
        id: youtubeId,
        title: video.title,
        language: video.language,
        season: video.season,
        episode: video.episode,
        series: video.series,
        source: "YouTube",
        youtube_video_id: youtubeId,
        preview_link: video.preview_link,
        thumbnail_url: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
      };
    }
  }
  // Return the original video if not a YouTube English video
  return video;
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('YouTube entries updated!'); 