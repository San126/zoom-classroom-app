import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './actions/authActions';
import ClassRoom from './ClassRoom';
import LoginForm from './LoginForm';
import Signup from './Signup';
import './styles.css';

const App = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [ariaHidden, setAriaHidden] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!authState.isAuthenticated && location.pathname !== '/' && location.pathname !== '/signup') {
      navigate('/');
    }
  }, [authState.isAuthenticated, location.pathname, navigate]);

  const setDetails = () => {
    const data = localStorage.getItem('user');
    if (data) {
      return JSON.parse(data);
    }
    return {};
  };

  const handleClose = () => {
    setFormVisibility(false);
    setAriaHidden(false);
  };

  const ProtectedRoute = ({ element: Component, ...rest }) => {
    return authState.isAuthenticated ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/" />
    );
  };

  return (
    <Routes>
      <Route path="/" element={<LoginForm sendData={setDetails} />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/schedulelist"
        element={
          <ProtectedRoute
            element={ClassRoom}
            props={setDetails()}
            showModal={formVisibility}
            handleClose={handleClose}
            aria_hidden={ariaHidden}
          />
        }
      />
      <Route
        path="/schedule"
        element={<ClassRoom handleClose={handleClose} aria_hidden={ariaHidden} />}
      />
    </Routes>
  );
};

export default App;
