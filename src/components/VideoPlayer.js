import React, { useRef, useEffect } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ video, seekTo, onTimeUpdate }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Seek to the new time whenever 'seekTo' changes
    if (videoRef.current && seekTo > 0) {
      const videoElement = videoRef.current;
      const seekToTime = () => {
        videoElement.currentTime = seekTo;
      };

      // If the video is ready, apply the seek immediately
      if (videoElement.readyState >= 2) {
        seekToTime();
      } else {
        // Wait until metadata is loaded to seek
        videoElement.addEventListener('loadedmetadata', seekToTime, { once: true });
      }
    }
  }, [seekTo]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (onTimeUpdate && videoRef.current) {
        onTimeUpdate(videoRef.current.currentTime);
      }
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onTimeUpdate]);

  return (
    <div className="video-player">
      <video ref={videoRef} src={video?.url || ''} controls />
    </div>
  );
};

export default VideoPlayer;
