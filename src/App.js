import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SceneProvider } from './context/SceneContext';
import SceneContextualization from './pages/SceneContextualization';

const App = () => {
  return (
    <Router>
      <Routes>


        {/* <Route
          path="/"
          element={
            <SceneProvider>
              <SceneContextualization />
            </SceneProvider>
          }
        /> */}


        <Route path="/" element={<Navigate to="/scene-contextualization" />} />

        {/* Only wrap the SceneContextualization component with SceneProvider */}
        <Route
          path="/scene-contextualization"
          element={
            <SceneProvider> {/* Context only available within SceneContextualization */}
              <SceneContextualization />
            </SceneProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
