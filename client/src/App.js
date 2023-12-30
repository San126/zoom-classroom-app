import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ClassRoom from './ClassRoom';
import LoginForm from './Login';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <>
    <div>
      <nav class="navbar navbar-light bg-light"><h4>Schedule Classroom App</h4></nav>
    </div>
     <Router>
     <Routes>
       {/* Default route for the login page */}
       <Route path="/" element={<LoginForm />} />
       <Route path="/schedule" element={<ClassRoom />} />
     </Routes>
   </Router>
   </>
  );
};

export default App;
