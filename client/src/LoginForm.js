import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, checkAuth } from './actions/authActions'; // Import Redux actions
import './styles.css';

import NavbarContents from './NavbarContents';

const LoginForm = ({ sendData }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authState = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(() => {
        if (authState.isAuthenticated) {
            navigate('/schedulelist');
            sendData(authState.user);
        }
    }, [authState.isAuthenticated, navigate, sendData, authState.user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    return (
        <>
            <NavbarContents />
            <div className='login'>
                <div className="container sm">
                    <div className="card-header">
                        <h3 className="text-center">Login</h3>
                    </div>
                    <div className="card-body">
                        {authState.error && <div className='alert alert-danger'>{authState.error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please choose a username.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please choose a password.
                                </div>
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    {authState.loading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="link"><p><a href="./signup">Create an account</a></p></div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
