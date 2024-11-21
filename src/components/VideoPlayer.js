import React, { useRef, useEffect, useState } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ video, seekTo, onTimeUpdate, scenes }) => {
  const videoRef = useRef(null);
  const [sceneWidths, setSceneWidths] = useState([]);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    // Calculate scene widths based on scene durations and video duration
    if (scenes && videoDuration) {
      const totalDuration = videoDuration;
      const sceneWidths = scenes.map((scene) => {
        const sceneDuration = calculateSceneDuration(scene);
        return (sceneDuration / totalDuration) * 100; // Percentage width
      });
      setSceneWidths(sceneWidths);
    }
  }, [video, scenes, videoDuration]);

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.addEventListener('loadedmetadata', () => {
      setVideoDuration(videoElement.duration);
    });
  }, [videoRef]);

  useEffect(() => {
    // Seek to the new time whenever 'seekTo' changes
    console.log("seeking",seekTo)
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
      videoElement.removeEventListener('timeupdate',handleTimeUpdate);
    };
  }, [onTimeUpdate]);

  const handleSceneClick = (sceneIndex) => {
    // Seek to the start of the clicked scene
    const scene = scenes[sceneIndex];
    const sceneStartTime = calculateSceneStartTime(scene);
    videoRef.current.currentTime = sceneStartTime;
    videoRef.current.play();
  };

  const calculateSceneDuration = (scene) => {
    // Extract scene duration from scene data (assuming "Scene" key holds duration string)
    const duration = Array.isArray(scene.Scene) ? scene.Scene[0] : scene.Scene;
    const [startTime, endTime] = duration.split('-').map(time => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    });
    return endTime - startTime; // Duration in seconds
  };

  const calculateSceneStartTime = (scene) => {
    // Extract scene start time from scene data (assuming "Scene" key holds duration string)
    const duration = Array.isArray(scene.Scene) ? scene.Scene[0] : scene.Scene;
    const [startTime] = duration.split('-').map(time => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    });
    return startTime; // Start time in seconds
  };

  return (
    <div className="video-player">
      <video ref={videoRef} src={video?.url || ''} controls />
      <div className="scene_segment_bar">
        {scenes.map((scene, index) => (
          <div
            key={index}
            className="seek_bar_scene"
            style={{ flex: sceneWidths[index] }}
            onClick={() => handleSceneClick(index)}
          >
            {/* Optionally add scene information here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;