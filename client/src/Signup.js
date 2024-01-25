import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import './styles.css';

//demo login page not active
const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(''); //success if successfully logged in logging in if trird loggin but not successful yet, unsuccessful if tried and failed 
    const [userDetails, setUserDetails] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:3001/api/signup', {
                username,
                password
            }).then(() => {
                // e.preventDefault();
                navigate('/');
                // setLoginStatus('success');
                // setUserDetails(response.data);
                alert("Signed up successfully. Login now.");
                console.log('Signed up successfully:');
            }).catch((error) => {
                console.log('Error while login', error);
            });
        }
        catch (error) {
            console.error('Error while login', error);
        }
    }

    return (
        <div className='login'>
            <div className="container sm">
                <div className="card-header">
                    <h3 className="text-center">Sign Up</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Enter Email address</label>
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
                        <div className="mb-3">
                            <label htmlFor="confirmedpassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmedpassword"
                                placeholder="Re-enter the password"
                                pattern={password}
                                value={confirmedPassword}
                                onChange={(e) => setConfirmedPassword(e.target.value)}
                                required
                            />
                            {/* {confirmedPassword !== password || confirmedPassword === '' && <div className="invalid-feedback">Please retype the password correctly</div>} */}
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;