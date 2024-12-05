import React from 'react';
import './SceneInfo.css';
import ConditionalRender from '../utils/ConditionalRender';

const SceneInfo = ({ currentScene }) => {
  if (!currentScene) return <div className="no_scene_info">Scene Data Not Available</div>;

  return (
    <div className="scene_container">
      <div className="header_row" style={{"display":"none"}}>
        {/* <div className='scene_no'><span>{currentScene["SceneIdx"]}</span></div> */}

        {/* Conditional rendering for Mood/Emotions */}{/* isArray={true}  default behaviour*/}
        <ConditionalRender data={currentScene["Mood/Emotions"]} isArray>
          {(emotions) => (
            <div><span>Emotions: </span>{emotions.join(', ')}</div>
          )}
        </ConditionalRender>

        {/* Conditional rendering for Locale */}
        <ConditionalRender data={currentScene["Locale"]} isArray>
          {(locales) => (
            <div><span>Locale: </span>{locales.join(', ')}</div>
          )}
        </ConditionalRender>

        {/* Conditional rendering for Scene Relevance Score */}
        <ConditionalRender data={currentScene["Scene Relevance Score"]} isArray>
          {(relevance) => (
            <div><span>Relevance: </span>{relevance[0]}</div>
          )}
        </ConditionalRender>
      </div>

      {/* Conditional rendering for Context */}
      <ConditionalRender data={currentScene["Context"]} isString>
        {(context) => (
          <fieldset className="contents_row">
            <legend>Context</legend>
            {context}
          </fieldset>
        )}
      </ConditionalRender>

      {/* Conditional rendering for Keywords */}
      <ConditionalRender data={currentScene["Keywords"]} isArray>
        {(keywords) => (
          <fieldset className="keywords_row">
            <legend>Keywords</legend>
            {keywords.join(', ')}
          </fieldset>
        )}
      </ConditionalRender>
    </div>
  );
};

export default SceneInfo;
