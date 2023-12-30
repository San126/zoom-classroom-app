import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

//demo login page not active
const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        try {
            const details = callApi(e);
            e.preventDefault();
            navigate('/schedule');
            console.log('Class scheduled successfully:', details.data);
        } catch (error) {
            console.error('Error while login', error);
        }
    };

    const callApi = async (e) => {
        try {
            const response = await axios.post('http://localhost:3001/api/login', {
                username,
                password
            });
        } catch (error) {
            console.error('Error while login', error);
        }
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Login</h3>
                        </div>
                        <div className="card-body">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
