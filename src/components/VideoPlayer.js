import React, { useRef, useEffect, useState } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ video, seekTo, onTimeUpdate, scenes, currentTime }) => {
  const videoRef = useRef(null);
  const [sceneWidths, setSceneWidths] = useState([]);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.addEventListener('loadedmetadata', () => {
      setVideoDuration(videoElement.duration); // Set video duration once it's loaded
    });
  }, [videoRef]);

  // Update current time when seekTo changes
  useEffect(() => {
    if (seekTo !== null && videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.currentTime = seekTo;
    }
  }, [seekTo]);

  // Handle time update and pass it to the parent
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (onTimeUpdate && videoRef.current) {
        onTimeUpdate(videoRef.current.currentTime); // Pass the current time to the parent component
      }
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onTimeUpdate]);

  // Calculate the duration of a scene
  const calculateSceneDuration = (scene) => {
    const duration = scene.Scene;
    const [start, end] = duration.split('-').map((time) => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    });
    return end - start; // return the duration in seconds
  };

  // Calculate the start time of a scene
  const calculateSceneStartTime = (scene) => {
    const duration = scene.Scene;
    const [start] = duration.split('-').map((time) => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    });
    return start; // return the start time in seconds
  };

  // Update scene bar width based on the video duration and scenes
  useEffect(() => {
    if (scenes && videoDuration) {
      const totalDuration = videoDuration;
      const sceneWidths = scenes.map((scene) => {
        const sceneDuration = calculateSceneDuration(scene);
        return (sceneDuration / totalDuration) * 100; // Calculate percentage width of each scene
      });
      setSceneWidths(sceneWidths);
    }
  }, [scenes, videoDuration]);

  // Get the index of the scene that is currently playing based on currentTime
  const getCurrentSceneIndex = () => {
    return scenes.findIndex(scene => {
      const startTime = calculateSceneStartTime(scene);
      const sceneDuration = calculateSceneDuration(scene);
      return currentTime >= startTime && currentTime < startTime + sceneDuration;
    });
  };

  const handleSceneClick = (sceneIndex) => {
    const scene = scenes[sceneIndex];
    const sceneStartTime = calculateSceneStartTime(scene);
    videoRef.current.currentTime = sceneStartTime; // Update video time to the clicked scene's start time
    // videoRef.current.play(); // Play the video
  };

  return (
    <div className="video-player">
      <video ref={videoRef} src={video?.url || ''} controls />
      <div className="scene_segment_bar">
        {scenes.map((scene, index) => {
          const sceneStartTime = calculateSceneStartTime(scene);
          const sceneDuration = calculateSceneDuration(scene);
          const isActive = currentTime >= sceneStartTime && currentTime < sceneStartTime + sceneDuration;

          return (
            <div
              key={index}
              className={`seek_bar_scene ${isActive ? 'active' : ''}`}
              style={{ flex: sceneWidths[index] }}
              onClick={() => handleSceneClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VideoPlayer;
