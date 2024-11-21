import React, { useRef, useEffect, useState } from "react";
import sceneIntroCss from './SceneIntroList.module.css';

const SceneIntroList = ({ scenes, currentTime, onSeekTo, className }) => {
  const sceneListRef = useRef(null);

  const currentSceneIndex = scenes.findIndex((scene) => {
    const duration = Array.isArray(scene.Scene) ? scene.Scene[0] : scene.Scene;
    const [startTime, endTime] = duration.split('-').map((time) => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    });

    return currentTime >= startTime && currentTime <= endTime;
  });

  useEffect(() => {
    if (sceneListRef.current && currentSceneIndex !== -1) {
      const container = sceneListRef.current;
      const sceneElement = container.children[currentSceneIndex];

      if (sceneElement) {
        container.scrollTop = sceneElement.offsetTop;
      }
    }
  }, [currentSceneIndex, currentTime]);

  const handleSceneClick = (sceneIndex) => {
    const scene = scenes[sceneIndex];
    const duration = Array.isArray(scene.Scene) ? scene.Scene[0] : scene.Scene;
    const [startTime] = duration.split('-').map((time) => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    });

    if (onSeekTo) {
      onSeekTo(startTime);
    }
  };

  return (
    <div className={className || sceneIntroCss.scene_intro_list}>
      <div className={sceneIntroCss.scene_list_container} ref={sceneListRef}>
        {scenes.map((scene, index) => (
          <div
            key={index}
            className={`${sceneIntroCss.scene_item} ${
              index === currentSceneIndex ? sceneIntroCss.highlight : ''
            }`}
            onClick={() => handleSceneClick(index+1)}
          >
            <span>Scene : {scene.SceneIdx}</span>
            <span>Relevance : {scene["Scene Relevance Score"]}</span>
            <br />
            <span>
              Keywords : {scene["Detailed Keywords"]["Keywords from Text"].join(", ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SceneIntroList;