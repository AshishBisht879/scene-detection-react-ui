import React, { useContext, useEffect } from 'react';
import './SceneContextualization.css';
import SceneContext from '../context/SceneContext.js';
import VideoPlayer from '../components/VideoPlayer.js';
import SceneList from '../components/SceneList.js';
import SceneInfo from '../components/SceneInfo.js';
import SeekBar from '../components/SeekBar.js';
import { fetchVideoNames, fetchSceneDetails, fetchVideoSignedUrl } from '../api/ServerApi.js';
import { getSceneTimes } from '../utils/getSceneTimes.js';

const SceneContextualization = () => {
    const { state, dispatch } = useContext(SceneContext);

    const calculateSceneIndex = (currentTime, scenes) => {
        return scenes.findIndex((scene,index) => {
            const { startTime, endTime } = getSceneTimes(scene);
            if (currentTime===startTime) {
                return true;
            }
            if(currentTime>startTime && currentTime < endTime){
                return true
            }

            if(currentTime === endTime && index+1 < scenes.length){
                const {startTime:nextSceneStartTime} = getSceneTimes(scenes[index+1]);
                return currentTime!== nextSceneStartTime;
            }

            return false;
        });
    };

    const handleVideoSelect = async (video) => {
        dispatch({ type: 'SET_LOADING', payload: true });

        try {
            const {url} = await fetchVideoSignedUrl(video);
            dispatch({ type: 'SET_VIDEO', payload: { name: video, url: url } });

            const fetchedScenes = await fetchSceneDetails(video);
            dispatch({ type: 'SET_SCENES', payload: fetchedScenes });
            dispatch({ type: 'SET_CURRENT_SCENE_INDEX', payload: 0 });
            dispatch({ type: 'SET_CURRENT_TIME', payload: 0 });

            dispatch({ type: 'SET_LOADING', payload: false });
        }
        catch (error) {
            console.error('Error in (func handleVideoSelect):', error.message);
        }
    };

    const handleSceneClick = (sceneIndex) => {
        const scene = state.scenes[sceneIndex];
        const { startTime } = getSceneTimes(scene);
        if (startTime !== state.currentTime) {
            dispatch({ type: 'SET_CURRENT_TIME', payload: startTime });
            dispatch({ type: 'SET_CURRENT_SCENE_INDEX', payload: sceneIndex });
        }
    };

    useEffect(() => {
        const fetchVideos = async () => {
            const {data} = await fetchVideoNames();
            dispatch({ type: 'SET_VIDEOS', payload: data });
        };
        fetchVideos();
    }, [dispatch]);

    useEffect(() => {
        if (state.scenes.length > 0) {
            const currentSceneIndex = calculateSceneIndex(state.currentTime, state.scenes);
            if (currentSceneIndex !== -1 && currentSceneIndex !== state.currentSceneIndex) {
                dispatch({ type: 'SET_CURRENT_SCENE_INDEX', payload: currentSceneIndex });
            }
        }
    }, [state.currentTime, state.scenes, state.currentSceneIndex, dispatch]);


    return (
        <div className={`scene-contextualization ${state.selectedVideo ? 'video-selected' : ''}`}>
        
        <div className='header'>
            <h1>
                Scene Contextualization
            </h1>
            <div className={`dropdown-container ${state.selectedVideo ? 'top-right' : ''}`}>
                <label>Processed Video : </label>
                <select className="custom-select" onChange={(e) => handleVideoSelect(e.target.value)} value={state.selectedVideo?.name || ''}>
                    <optgroup>
                        <option value="" disabled>-- Select a Video --</option>
                        {state.videos && state.videos.map((video, index) => (
                            <option key={index} value={video.folder}>{video.folder}</option>
                        ))}
                    </optgroup>
                </select>
            </div>
        </div>

            <div className='main-content'>
                {state.loading && <div className='loading'>Loading...</div>}
                {!state.loading && state.selectedVideo && (
                    <>
                        <div className='left-panel'>
                            <div className='video_player_seek_bar'>
                            <VideoPlayer video={state.selectedVideo} currentTime={state.currentTime} dispatch={dispatch}/>
                            <SeekBar
                                scenes={state.scenes}
                                currentSceneIndex={state.currentSceneIndex}
                                onSceneClick={handleSceneClick}
                            />
                            </div>
                            <div className='scene_info'>
                            <SceneInfo currentScene={state.scenes[state.currentSceneIndex] || null} />
                            </div>
                        </div>
                        <div className='right-panel'>
                        <SceneList
                            scenes={state.scenes}
                            currentSceneIndex={state.currentSceneIndex}
                            onSceneClick={handleSceneClick}
                        />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SceneContextualization;
