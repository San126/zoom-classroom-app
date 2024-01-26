import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ClassRoom from './ClassRoom';
import LoginForm from './Login';
import Signup from './Signup';
import ScheduleForm from './ScheduleForm';

import './styles.css';

const App = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const setDetails = (data) => {
    console.log(data)
    console.log('Data received from child:', data);
    setUserDetails(data);
  };

  const handleModalVisibility = (value) => {
    if (value){
    setFormVisibility(value);
    }
    else{
      setFormVisibility(!formVisibility);
    }
  };

  return (
    <>
      <div>
        <nav className="navbar">
          <span class="nav-design"><h4>Schedule Classroom App</h4></span>
          <span>
            {/* <div  > */}
            <span className='list-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                <path onClick={(e) => setFormVisibility(!formVisibility)} fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
              </svg>
            </span>
            {/* </div> */}
            <span className='login-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
              </svg>
            </span>
          </span>
        </nav>
        <div><ScheduleForm showModal={formVisibility} handleVisibility={handleModalVisibility}/></div>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm sendData={setDetails} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/schedule" element={<ClassRoom props={userDetails} showModal={formVisibility} />} />
          {/* <Route path="/schedule" element={(props)=>{<ClassRoom handleClose={handleClose} aria_hidden={aria_hidden} {...props} />}}/> */}

        </Routes>
      </Router>
    </>
  );
};

export default App;
