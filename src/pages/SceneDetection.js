import React, { useState, useEffect } from 'react';
import "./SceneDetection.css";
import VideoList from '../components/VideoList';
import SceneList from '../components/SceneList';
import VideoPlayer from '../components/VideoPlayer';
import { fetchVideoNames, fetchVideoSignedUrl, fetchSceneDetails } from '../components/ServerApi';

const SceneDetection = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [scenes, setScenes] = useState([]);
    const [loading, setLoading] = useState(0); // 0 => show nothing, 1 => loading, 2 => done, 3 => error
    const [seekTo, setSeekTo] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const getVideos = async () => {
            const videoList = await fetchVideoNames();
            setVideos(videoList);
        };
        getVideos();
    }, []);

    const handleVideoSelect = async (videoName) => {
        setLoading(1); // Show Loading
        const signedURL = await fetchVideoSignedUrl(videoName);
        setSelectedVideo({ name: videoName, url: signedURL["url"] });
        setScenes([]);

        if (videoName) {
            const sceneData = await fetchSceneDetails(videoName);
            setScenes(sceneData);
        }
        setLoading(2);
    };

    const handleSceneDurationClick = (duration) => {
        console.log('Scene Duration Clicked:', duration);

        // Parse the duration string to seconds
        const timeRegex = /^\s*\d{1,2}:\d{2}:\d{2}\s*$/;
        const times = duration.split('-');
        if (times.length === 2 && times.every(time => timeRegex.test(time))) {
            const [hours, minutes, seconds] = times[0].split(':').map(Number);
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;

            // Seek to the start of the clicked scene
            setSeekTo(totalSeconds);
        }
    };

    const handleTimeUpdate = (time) => {
        // Receive current time from VideoPlayer and update state
        setCurrentTime(time);
    };

    return (
        <div className={`scene-detection ${selectedVideo ? 'video-selected' : ''}`}>
            <h1>Scene Detection</h1>

            {/* Video Dropdown */}
            <div className={`dropdown-container ${selectedVideo ? 'top-right' : 'center'}`}>
                <VideoList videos={videos} onSelect={handleVideoSelect} />
            </div>

            {/* Content Display */}
            {loading === 2 && (
                <>
                    {/* Video Player */}
                    <VideoPlayer 
                        video={selectedVideo} 
                        seekTo={seekTo} 
                        onTimeUpdate={handleTimeUpdate} 
                    />

                    {/* Scene List */}
                    <SceneList 
                        scenes={scenes} 
                        onSceneDurationClick={handleSceneDurationClick} 
                        currentTime={currentTime} 
                    />
                </>
            )}
            
            {loading === 1 && <div className="loading">Loading ...</div>}
            {loading === 3 && <div>Could not fetch Scene Data for {selectedVideo.name}</div>}
        </div>
    );
};

export default SceneDetection;
