import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, X, Maximize2, Minimize2 } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  autoPlay?: boolean;
  googleDriveFileId?: string;
  playlistId?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  title,
  isOpen,
  onClose,
  autoPlay = false,
  googleDriveFileId,
  playlistId
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Debug logging
  useEffect(() => {
    if (isOpen) {
      console.log('VideoPlayer opened with:', {
        videoId,
        title,
        googleDriveFileId,
        playlistId,
        autoPlay
      });
    }
  }, [isOpen, videoId, title, googleDriveFileId, playlistId, autoPlay]);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Close dialog when Escape is pressed
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Generate YouTube embed URL
  const getYouTubeEmbedUrl = () => {
    // Extract only the 11-character YouTube ID (in case videoId has extra params)
    const idMatch = (videoId || '').match(/[a-zA-Z0-9_-]{11}/);
    const cleanId = idMatch ? idMatch[0] : '';
    if (!cleanId) {
      console.log('No valid YouTube ID found in:', videoId);
      return '';
    }
    let url = `https://www.youtube.com/embed/${cleanId}?autoplay=${autoPlay ? 1 : 0}&rel=0&modestbranding=1&showinfo=0&controls=1&fs=0`;
    
    // Add playlist parameter if playlistId is provided
    if (playlistId) {
      url += `&list=${playlistId}`;
    }
    
    console.log('Generated YouTube embed URL:', url);
    return url;
  };

  // Generate Google Drive embed URL
  const getGoogleDriveEmbedUrl = () => {
    if (!googleDriveFileId) {
      console.log('No Google Drive file ID provided');
      return '';
    }
    // Use the more reliable embed URL format
    const url = `https://drive.google.com/file/d/${googleDriveFileId}/preview`;
    console.log('Generated Google Drive embed URL:', url);
    return url;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`p-0 bg-black ${isFullscreen ? 'w-screen h-screen max-w-none' : 'max-w-4xl'}`}
        style={{ 
          width: isFullscreen ? '100vw' : undefined,
          height: isFullscreen ? '100vh' : undefined,
          maxWidth: isFullscreen ? 'none' : undefined
        }}
      >
        <DialogHeader className="flex flex-row items-center justify-between p-4 bg-black text-white">
          <DialogTitle className="text-lg font-semibold truncate flex-1">
            {title}
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/10"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="relative bg-black">
          {googleDriveFileId ? (
            <>
              <iframe
                src={getGoogleDriveEmbedUrl()}
                title={title}
                className="w-full aspect-video"
                frameBorder="0"
                allow="autoplay; fullscreen"
              />
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '80px',
                height: '80px',
                zIndex: 2,
                cursor: 'not-allowed',
                background: 'transparent',
              }} />
            </>
          ) : (
            getYouTubeEmbedUrl() ? (
              <iframe
                src={getYouTubeEmbedUrl()}
                title={title}
                className="w-full aspect-video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              />
            ) : (
              <div className="w-full aspect-video flex items-center justify-center text-white bg-black">
                <div className="text-center">
                  <p className="mb-2">Unable to load video</p>
                  <p className="text-sm text-gray-400">
                    {videoId ? `Video ID: ${videoId}` : 'No video ID provided'}
                  </p>
                  {googleDriveFileId && (
                    <p className="text-sm text-gray-400">
                      Google Drive ID: {googleDriveFileId}
                    </p>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer; 