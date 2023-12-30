import React from 'react';
import ClassRoom from './ClassRoom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <div>
      <nav class="navbar navbar-light bg-light"><h4>Schedule Classroom App</h4></nav>
      <ClassRoom />
    </div>
  );
};

export default App;
