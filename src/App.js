import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import SceneDetection from './pages/SceneDetection.js';


const App = () =>{
  return (
    <Router>
      <div>
        <nav>
          <Routes>
            <Route path='/' element={<SceneDetection/>}>
            </Route>
          </Routes>
        </nav>
      </div>
    </Router>
  )
}

export default App;