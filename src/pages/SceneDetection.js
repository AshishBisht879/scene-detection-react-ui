import React, { useState, useEffect } from 'react';
import './SceneDetection.css';
import VideoList from '../components/VideoList';
import SceneList from '../components/SceneList';
import VideoPlayer from '../components/VideoPlayer';
import SceneIntroList from '../components/SceneIntroList';
import { fetchVideoNames, fetchVideoSignedUrl, fetchSceneDetails } from '../components/ServerApi';

const SceneDetection = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [loading, setLoading] = useState(0);
  const [seekTo, setSeekTo] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const getVideos = async () => {
      const videoList = await fetchVideoNames();
      setVideos(videoList);
    };
    getVideos();
  }, []);

  const handleVideoSelect = async (videoName) => {
    setLoading(1);
    const signedURL = await fetchVideoSignedUrl(videoName);
    setSelectedVideo({ name: videoName, url: signedURL["url"] });
    setScenes([]);
    if (videoName) {
      const sceneData = await fetchSceneDetails(videoName);
      setScenes(sceneData);
    }
    setLoading(2);
  };

  const handleSceneClick = (sceneStartTime) => {
    setSeekTo(sceneStartTime);
    setCurrentTime(sceneStartTime); // Update current time immediately
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  return (
    <div className={`scene-detection ${selectedVideo ? 'video-selected' : ''}`}>
      <h1>Scene Detection</h1>

      <div className={`dropdown-container ${selectedVideo ? 'top-right' : 'center'}`}>
        <VideoList videos={videos} onSelect={handleVideoSelect} />
      </div>

      <div className="main_body_content">
        {loading === 2 && (
          <div className="video_and_scene_container">
            <div className="video_container">
              <VideoPlayer
                video={selectedVideo}
                seekTo={seekTo}
                onTimeUpdate={handleTimeUpdate} // Sync currentTime with the video
                scenes={scenes}
                currentTime={currentTime} // Pass current time to VideoPlayer
              />
            </div>

            <div className="scene_info_container">
              <SceneList
                scenes={scenes}
                currentTime={currentTime} // Sync currentTime with SceneList for highlighting
              />
            </div>
          </div>
        )}

        {loading === 2 && (
          <div className="sceneList">
            <SceneIntroList
              scenes={scenes}
              currentTime={currentTime} // Sync currentTime with SceneIntroList for highlighting
              onSceneDurationClick={handleSceneClick} // Handle scene click
            />
          </div>
        )}

        {loading === 1 && <div className="loading">Loading ...</div>}
        {loading === 3 && <div>Could not fetch Scene Data for {selectedVideo.name}</div>}
      </div>
    </div>
  );
};

export default SceneDetection;
