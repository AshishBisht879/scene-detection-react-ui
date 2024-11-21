import React, { useRef, useEffect } from 'react';
import sceneIntroCss from './SceneIntroList.module.css';

const SceneIntroList = ({ scenes, currentTime, onSceneDurationClick, className }) => {
  const sceneListRef = useRef(null);

  // Calculate the start and end time of each scene
  const getSceneTimes = (scene) => {
    const [startTime, endTime] = scene.Scene.split('-').map((time) => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    });
    return { startTime, endTime };
  };

  // Find the index of the current scene based on currentTime
  const currentSceneIndex = scenes.findIndex((scene) => {
    const { startTime, endTime } = getSceneTimes(scene);
    return currentTime >= startTime && currentTime <= endTime;
  });

  useEffect(() => {
    if (sceneListRef.current && currentSceneIndex !== -1) {
      const container = sceneListRef.current;
      const sceneElement = container.children[currentSceneIndex];

      if (sceneElement) {
        container.scrollTop = sceneElement.offsetTop; // Scroll the scene into view if it's not visible
      }
    }
  }, [currentSceneIndex, currentTime]);

  // Handle scene click: update the current time in the parent component
  const handleSceneClick = (sceneIndex) => {
    const scene = scenes[sceneIndex];
    const { startTime } = getSceneTimes(scene); // Get the start time of the clicked scene

    if (onSceneDurationClick) {
      onSceneDurationClick(startTime); // Notify parent to update the video time
    }
  };

  return (
    <div className={className || sceneIntroCss.scene_intro_list}>
      <div className={sceneIntroCss.scene_list_container} ref={sceneListRef}>
        {scenes.map((scene, index) => {
          const { startTime, endTime } = getSceneTimes(scene);

          // Check if the current scene is playing (highlight if the current time is within the scene's start and end time)
          const isActive = currentTime >= startTime && currentTime < endTime;
          return (
            <div
              key={index}
              className={`${sceneIntroCss.scene_item} ${isActive ? sceneIntroCss.highlight : ''}`}
              onClick={() => handleSceneClick(index)} // When clicked, set the video time to the scene's start time
            >
              <span>Scene: {scene.SceneIdx}</span>
              <span>Relevance: {scene["Scene Relevance Score"]}</span>
              <br />
              <span>
                Keywords: {scene["Detailed Keywords"]["Keywords from Text"].join(", ")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SceneIntroList;
