import React, { createContext, useReducer } from 'react';

const SceneContext = createContext();

const initialState = {
  videos: [],
  selectedVideo: null,
  scenes: [],
  currentTime: 0,
  loading: false,
  currentSceneIndex:-1,
};

const sceneReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VIDEOS':
      return { ...state, videos: action.payload };
    case 'SET_VIDEO':
      return { ...state, selectedVideo: action.payload, scenes: [] };
    case 'SET_SCENES':
      return { ...state, scenes: action.payload };
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CURRENT_SCENE_INDEX':
        return {...state,currentSceneIndex:action.payload};
    default:
      return state;
  }
};

export const SceneProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sceneReducer, initialState);

  return (
    <SceneContext.Provider value={{ state, dispatch }}>
      {children}
    </SceneContext.Provider>
  );
};

export default SceneContext;
