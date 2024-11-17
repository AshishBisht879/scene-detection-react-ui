import React, { useEffect, useRef } from 'react';
import './SceneList.css';

const SceneList = ({ scenes, currentTime }) => {
  const sceneListRef = useRef(null);

  // Determine the index of the currently playing scene
  const currentSceneIndex = scenes.findIndex(scene => {
    const duration = Array.isArray(scene.Scene) ? scene.Scene[0] : scene.Scene;
    const [startTime, endTime] = duration.split('-').map(time => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    });

    return currentTime >= startTime && currentTime <= endTime;
  });

  useEffect(() => {
    // Scroll the scene list to bring the current scene to the top
    if (sceneListRef.current && currentSceneIndex !== -1) {
      const container = sceneListRef.current;
      const sceneElement = container.children[currentSceneIndex];
      if (sceneElement) {
        // Scroll so that the scene element becomes the first visible element
        container.scrollTo({
          top: sceneElement.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }, [currentSceneIndex, currentTime]);

  return (
    <div className="scene-info">
      <h3>Scene Information</h3>
      <div className="scene-container">
        <div className="header-row">
          <div className="header-item scene-idx-header">Scene</div>
          <div className="header-item duration-header">Time Duration</div>
          <div className="header-item relevance-header">Relevance Score</div>
          <div className="header-item genre-header">Genre</div>
          <div className="header-item text-keywords-header">Text Keywords</div>
          <div className="header-item image-keywords-header">Image & Text Keywords</div>
        </div>
        <div className="scene-columns" ref={sceneListRef}>
          {scenes.map((scene, index) => (
            <div
              key={index}
              className={`scene-column ${index === currentSceneIndex ? 'highlight' : ''}`}
            >
              <div className="scene-item scene-idx">{scene.SceneIdx}</div>
              <div className="scene-item duration">{scene.Scene}</div>
              <div className="scene-item relevance">{scene["Scene Relevance Score"]}</div>
              <div className="scene-item genre">{scene.Genre.join(", ")}</div>
              <div className="scene-item text-keywords">{scene["Detailed Keywords"]["Keywords from Text"].join(", ")}</div>
              <div className="scene-item image-keywords">{scene["Detailed Keywords"]["Keywords from Text and Images"].join(", ")}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SceneList;
