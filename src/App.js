import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { SceneProvider } from './context/SceneContext'; // import the provider
import SceneContextualization from './pages/SceneContextualization';

const App = () => {
  return (
    <SceneProvider> {/* Wrap the app or part of the app where you need context */}
      <SceneContextualization />
    </SceneProvider>
  );
};

export default App;