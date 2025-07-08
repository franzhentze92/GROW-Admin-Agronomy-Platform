import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Play, Globe, Calendar } from 'lucide-react';
import { Video, videoApiService } from '../lib/videoApi';
import VideoPlayer from '../components/VideoPlayer';

// Import the processed video data
import processedVideosData from '../../processed-videos.json';

const EducationVideoPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedEpisode, setSelectedEpisode] = useState<string>('all');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    // Use the processed video data instead of API calls
    const processedVideos: Video[] = processedVideosData.videos.map(video => ({
      id: video.id,
      title: video.title || 'Untitled',
      description: (video as any).description || 'No description available',
      season: video.season || null,
      episode: video.episode || null,
      language: video.language || 'Unknown',
      tags: (video as any).tags || [], // Provide empty array as default
      category_id: (video as any).category_id || null,
      privacy_status: (video as any).privacy_status as 'private' | 'unlisted' | 'public' || 'private',
      google_drive_file_id: video.google_drive_file_id,
      youtube_video_id: (video as any).youtube_video_id || undefined,
      upload_status: (video as any).upload_status as 'pending' | 'uploading' | 'completed' | 'failed' || 'completed',
      upload_date: (video as any).upload_date || new Date().toISOString(),
      duration: (video as any).duration || 'N/A',
      thumbnail_url: (video as any).thumbnail_url || null,
      created_at: (video as any).created_at || new Date().toISOString(),
      updated_at: (video as any).updated_at || new Date().toISOString(),
      series: (video as any).series || 'Unknown',
      source: (video as any).source || 'Google Drive',
      preview_link: (video as any).preview_link || null
    }));

    console.log('Total videos loaded:', processedVideos.length);
    console.log('YouTube videos:', processedVideos.filter(v => v.source === 'YouTube').length);
    console.log('English videos:', processedVideos.filter(v => v.language === 'English').length);
    console.log('Sample YouTube video:', processedVideos.find(v => v.source === 'YouTube'));

    setVideos(processedVideos);
    setFilteredVideos(processedVideos);
    setLoading(false);
  }, []);

  // Filter videos based on search and filters
  useEffect(() => {
    let filtered = videos.filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Series filter
    if (selectedSeries !== 'all') {
      filtered = filtered.filter(video => video.series === selectedSeries);
    }

    // Season filter
    if (selectedSeason !== 'all') {
      filtered = filtered.filter(video => video.season === parseInt(selectedSeason));
    }

    // Language filter
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(video => video.language === selectedLanguage);
    }

    // Episode filter
    if (selectedEpisode !== 'all') {
      filtered = filtered.filter(video => video.episode === parseInt(selectedEpisode));
    }

    console.log('Filtering results:', {
      totalVideos: videos.length,
      afterSearch: filtered.length,
      selectedLanguage,
      selectedSeries,
      selectedSeason,
      selectedEpisode,
      englishVideos: videos.filter(v => v.language === 'English').length,
      filteredEnglishVideos: filtered.filter(v => v.language === 'English').length,
      youtubeVideos: videos.filter(v => v.source === 'YouTube').length,
      filteredYouTubeVideos: filtered.filter(v => v.source === 'YouTube').length,
      sampleEnglishVideos: videos.filter(v => v.language === 'English').slice(0, 3).map(v => ({ title: v.title, source: v.source }))
    });

    setFilteredVideos(filtered);
  }, [videos, searchTerm, selectedSeries, selectedSeason, selectedLanguage, selectedEpisode]);

  // Reset episode selection when series or season changes
  useEffect(() => {
    setSelectedEpisode('all');
  }, [selectedSeries, selectedSeason]);

  const getUniqueSeasons = () => {
    const seasons = [...new Set(videos.map(video => video.season).filter(season => season !== null))].sort((a, b) => a - b);
    return seasons;
  };

  const getUniqueLanguages = () => {
    const languages = [...new Set(videos.map(video => video.language))].sort();
    return languages;
  };

  const getUniqueEpisodes = () => {
    // Filter episodes based on selected series and season
    let filteredVideos = videos;
    
    if (selectedSeries !== 'all') {
      filteredVideos = filteredVideos.filter(video => video.series === selectedSeries);
    }
    
    if (selectedSeason !== 'all') {
      filteredVideos = filteredVideos.filter(video => video.season === parseInt(selectedSeason));
    }
    
    const episodes = [...new Set(filteredVideos.map(video => video.episode).filter(episode => episode !== null))].sort((a, b) => a - b);
    return episodes;
  };

  const getUniqueSeries = () => {
    const series = [...new Set(videos.map(video => video.series || 'Unknown'))].sort();
    return series;
  };

  const getFilteredSeasons = () => {
    // Filter seasons based on selected series
    let filteredVideos = videos;
    
    if (selectedSeries !== 'all') {
      filteredVideos = filteredVideos.filter(video => video.series === selectedSeries);
    }
    
    const seasons = [...new Set(filteredVideos.map(video => video.season).filter(season => season !== null))].sort((a, b) => a - b);
    return seasons;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSeason('all');
    setSelectedLanguage('all');
    setSelectedEpisode('all');
    setSelectedSeries('all');
  };

  const openVideo = (video: Video) => {
    console.log('openVideo called with:', video);
    console.log('Video details:', {
      source: video.source,
      youtube_video_id: video.youtube_video_id,
      google_drive_file_id: video.google_drive_file_id,
      preview_link: video.preview_link
    });
    
    let videoId = '';
    let googleDriveFileId = undefined;
    
    if (video.source === 'YouTube' && video.youtube_video_id) {
      // Use the YouTube video ID directly
      videoId = video.youtube_video_id;
      console.log('Using YouTube video ID:', videoId);
    } else if (video.source === 'YouTube' && video.preview_link) {
      // Fallback: Extract YouTube video ID from the URL
      const match = video.preview_link.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
      videoId = match ? match[1] : '';
      console.log('Extracted YouTube video ID from URL:', videoId);
    } else if (video.google_drive_file_id) {
      // Google Drive video
      googleDriveFileId = video.google_drive_file_id;
      videoId = video.google_drive_file_id; // fallback for legacy
      console.log('Using Google Drive file ID:', googleDriveFileId);
    }
    
    console.log('Final video parameters:', { videoId, googleDriveFileId });
    setSelectedVideo({ ...video, videoId, googleDriveFileId });
    setIsVideoPlayerOpen(true);
  };

  const closeVideo = () => {
    setIsVideoPlayerOpen(false);
    setSelectedVideo(null);
  };

  const openYouTubePlaylist = () => {
    // Nutri-Tech Solutions playlist ID
    const playlistId = 'PLXReS_QZvjWDIWzZ2QSdj7oOHGkTUqx1B';
    const firstVideoId = 'HRqDXnvlRdg'; // First video in the playlist
    
    setSelectedVideo({
      id: 'playlist',
      title: 'Nutri-Tech Solutions - Complete Video Library',
      videoId: firstVideoId,
      playlistId: playlistId,
      language: 'English',
      series: 'How to Do It Series',
      season: null,
      episode: null,
      description: 'Complete collection of Nutri-Tech Solutions educational videos',
      tags: [],
      category_id: '',
      privacy_status: 'public',
      google_drive_file_id: '',
      upload_status: 'completed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    setIsVideoPlayerOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading video library...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">G.R.O.W Video Library</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access our comprehensive collection of educational videos covering sustainable agriculture, 
            soil health, crop management, and more. Available in multiple languages.
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter Videos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search videos by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>

            {/* Filter Options */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Series</label>
                <Select value={selectedSeries} onValueChange={setSelectedSeries}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Series" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Series</SelectItem>
                    {getUniqueSeries().map(series => (
                      <SelectItem key={series} value={series}>
                        {series}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Season</label>
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Seasons" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Seasons</SelectItem>
                    {getFilteredSeasons().map(season => (
                      <SelectItem key={season} value={season.toString()}>
                        Season {season}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Language</label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {getUniqueLanguages().map(language => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Episode</label>
                <Select value={selectedEpisode} onValueChange={setSelectedEpisode}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Episodes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Episodes</SelectItem>
                    {getUniqueEpisodes().map(episode => (
                      <SelectItem key={episode} value={episode.toString()}>
                        Episode {episode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Badge variant="secondary" className="text-sm">
                  {filteredVideos.length} videos found
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No videos found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => {
              // Determine thumbnail source
              let thumbnailSrc = video.thumbnail_url;
              if (!thumbnailSrc) {
                if (video.series === 'CARBONPOWER22') {
                  thumbnailSrc = '/carbonpower22.jpg';
                } else if (video.series === "Graeme's Exclusives") {
                  thumbnailSrc = '/graemes-exclusives.jpg';
                } else if (video.series === 'Gold from the Vaults') {
                  thumbnailSrc = '/gold-from-the-vaults.jpg';
                } else if (video.series === 'Graeme Sait Clips') {
                  thumbnailSrc = '/graeme_sait_clips.png';
                } else if (video.source === 'YouTube' && video.youtube_video_id) {
                  thumbnailSrc = `https://img.youtube.com/vi/${video.youtube_video_id}/maxresdefault.jpg`;
                }
              }
              return (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src={thumbnailSrc}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                        onClick={() => { console.log('Play button clicked for:', video); openVideo(video); }}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Watch
                      </Button>
                    </div>
                    {/* Only show duration badge if duration is not missing/empty/null and not 'N/A' */}
                    {video.duration && video.duration !== 'N/A' && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          {video.duration}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                        {/* Show series name if available */}
                        {video.series && video.series !== 'Unknown' && (
                          <div className="text-sm text-muted-foreground font-medium mt-1">{video.series}</div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        {video.language}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          S{video.season || '?'}E{video.episode || '?'}
                        </Badge>
                        {(video.tags || []).slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { console.log('Play button clicked for:', video); openVideo(video); }}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Watch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      {selectedVideo && (
        <VideoPlayer
          videoId={selectedVideo.videoId}
          title={selectedVideo.title}
          isOpen={isVideoPlayerOpen}
          onClose={closeVideo}
          googleDriveFileId={selectedVideo.googleDriveFileId}
          playlistId={selectedVideo.playlistId}
        />
      )}
    </>
  );
}

export default EducationVideoPage;