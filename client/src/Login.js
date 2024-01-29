import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './styles.css';

import ScheduleForm from './ScheduleForm';

//demo login page not active
const LoginForm = ({ sendData }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(''); //success if successfully logged in logging in if trird loggin but not successful yet, unsuccessful if tried and failed 
    const [userDetails, setUserDetails] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoginStatus("logging in");
            const response = await axios.post('http://localhost:3001/auth/login', {
                username,
                password
            });
            navigate('/schedule');
            setLoginStatus('success');
            sendData(response.data);
            setUserDetails(response.data);
            console.log('Class scheduled successfully:', response.data);
        }
        catch (error) {
            if (error.response?.status === 401) {
                setLoginStatus('unsuccessful');
            }
            else {
                alert(error.response.data.message);
            }
            console.error('Error while login', error);
        }
    }

    return (
        <div className='login'>
            <div className="container sm">
                <div className="card-header">
                    <h3 className="text-center">Login</h3>
                </div>
                <div className="card-body">
                    {loginStatus === 'unsuccessful' && <div className='alert alert-danger'>
                        Invalid username or password!
                    </div>}
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
                            <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Login</button>
                        </div>
                    </form>
                </div>
                <div class="link"><p><a href="./signup">Create an account</a></p></div>
            </div>
        </div>
    );
};

export default LoginForm;
