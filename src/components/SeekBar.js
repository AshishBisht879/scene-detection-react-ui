import React from 'react';
import './SeekBar.css';
import { getSceneTimes } from '../utils/getSceneTimes.js';

const SeekBar = React.memo(({ scenes, currentSceneIndex, onSceneClick }) => {
  return (
    <div className="seek-bar">
      {Array.isArray(scenes) && scenes.map((scene, index) => {
        const {startTime,endTime} = getSceneTimes(scene);
        const isActive = index === currentSceneIndex;
        return (
          <div
            key={index}
            className={`seek-bar-segment ${isActive ? 'active' : ''}`}
            onClick={() => onSceneClick(index)}
            style={{
              flex: endTime - startTime,
            }}
          >
          </div>
        );
      })}
    </div>
  );
});

export default SeekBar;
