import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ClassRoom from './ClassRoom';
import LoginForm from './Login';
import './styles.css';

const App = () => {
  return (
    <>
    <div>
      <nav class="navbar"><h4>Schedule Classroom App</h4></nav>
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
