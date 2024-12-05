import React from 'react';
import style from './SceneList.module.css';
import ConditionalRender from '../utils/ConditionalRender';

const SceneList = React.memo(({ scenes, currentSceneIndex, onSceneClick }) => {
    if (!Array.isArray(scenes) || scenes.length === 0) {
        return <div className="no_scene_info">Scene Data Not Available</div>;
    }

    return (
        <div className='scene_list'>
            {scenes.map((scene, index) => (
                <div
                    key={index}
                    className={`${style.scene_item} ${index === currentSceneIndex ? style.active : ''}`}
                    onClick={() => onSceneClick(index)}
                >
                    <h4>Scene: {scene.SceneIdx}</h4>

                    {/* Conditional rendering for Scene Relevance Score */}
                    <ConditionalRender data={scene['Scene Relevance Score']} isArray>
                        {(relevance) => (
                            <p><span>Relevance : </span>{relevance[0]}</p>
                        )}
                    </ConditionalRender>
                    {/* Conditional rendering for Locale */}
                    <ConditionalRender data={scene['Locale']} isArray>
                        {(locale) => (
                            <p><span>Locale : </span> {locale.join(', ')}</p>
                        )}
                    </ConditionalRender>

                    {/* Conditional rendering for Mood/Emotions */}
                    <ConditionalRender data={scene['Mood/Emotions']} isArray>
                        {(emotions) => (
                            <p><span>Mood/Emotions : </span> {emotions.join(', ')}</p>
                        )}
                    </ConditionalRender>

                    {/* Conditional rendering for Keywords */}
                    {/* <ConditionalRender data={scene['Keywords']} isArray>
                        {(keywords) => (
                            <p><span>Keywords:</span> {keywords.join(', ')}</p>
                        )}
                    </ConditionalRender> */}


                    {/* Conditional rendering for Context */}
                    {/* <ConditionalRender data={scene['Context']} isString>
                        {(context) => (
                            <p><span>Context:</span>{context}</p>
                        )}
                    </ConditionalRender> */}
                </div>
            ))}
        </div>
    );
});

export default SceneList;
