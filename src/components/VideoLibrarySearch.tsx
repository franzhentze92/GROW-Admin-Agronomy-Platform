import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Play } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import processedVideosData from '../../processed-videos.json';

const VideoLibrarySearch: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedEpisode, setSelectedEpisode] = useState<string>('all');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

  useEffect(() => {
    const processedVideos = processedVideosData.videos.map((video: any) => ({
      ...video,
      title: video.title || 'Untitled',
      description: video.description || '',
      season: video.season || null,
      episode: video.episode || null,
      language: video.language || 'Unknown',
      tags: video.tags || [],
      series: video.series || 'Unknown',
      source: video.source || 'Google Drive',
      preview_link: video.preview_link || null,
      youtube_video_id: video.youtube_video_id || undefined,
      thumbnail_url: video.thumbnail_url || null,
      duration: video.duration || 'N/A',
    }));
    setVideos(processedVideos);
    setFilteredVideos(processedVideos);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = videos.filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (video.description && video.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (video.series && video.series.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    if (selectedSeries !== 'all') {
      filtered = filtered.filter(video => video.series === selectedSeries);
    }
    if (selectedSeason !== 'all') {
      filtered = filtered.filter(video => video.season === parseInt(selectedSeason));
    }
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(video => video.language === selectedLanguage);
    }
    if (selectedEpisode !== 'all') {
      filtered = filtered.filter(video => video.episode === parseInt(selectedEpisode));
    }
    setFilteredVideos(filtered);
  }, [videos, searchTerm, selectedSeries, selectedSeason, selectedLanguage, selectedEpisode]);

  const getUniqueSeasons = () => {
    const seasons = [...new Set(videos.map(video => video.season).filter(season => season !== null))].sort((a, b) => a - b);
    return seasons;
  };
  const getUniqueLanguages = () => {
    const languages = [...new Set(videos.map(video => video.language))].sort();
    return languages;
  };
  const getUniqueEpisodes = () => {
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
  const openVideo = (video: any) => {
    setSelectedVideo(video);
    setIsVideoPlayerOpen(true);
  };
  const closeVideo = () => {
    setIsVideoPlayerOpen(false);
    setSelectedVideo(null);
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
    <div className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Videos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredVideos.map((video) => {
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
                      onClick={() => openVideo(video)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                  {video.duration && video.duration !== 'N/A' && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black bg-opacity-60 text-white">
                        {video.duration}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold line-clamp-2">{video.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs line-clamp-2 mb-2">
                    {video.description || video.series || video.language || ''}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      {isVideoPlayerOpen && selectedVideo && (
        <VideoPlayer video={selectedVideo} onClose={closeVideo} />
      )}
    </div>
  );
};

export default VideoLibrarySearch; 