
import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const CHECK_AUTH = 'CHECK_AUTH';

export const login = (credentials) => async (dispatch) => {
    const {username, password} = credentials;
    dispatch({ type: LOGIN_REQUEST });

    try {
        const response = await axios.post('http://localhost:3001/auth/login', {
            username,
            password
        });
        const user = response.config.data;

        localStorage.setItem('user', user);

        dispatch({ type: LOGIN_SUCCESS, payload: user });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, error: error.response?.data.message || 'Login failed' });
    }
};

export const logout = () => {
    localStorage.removeItem('user');
    return { type: LOGOUT };
};

export const checkAuth = () => async (dispatch) => {
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            dispatch({ type: LOGIN_SUCCESS, payload: user });
        }
        else {
            const response = await axios.get('http://localhost:3001/auth/check');
            dispatch({
                type: CHECK_AUTH,
                payload: response.data.isAuthenticated,
            });
        }
    } catch (error) {
        dispatch({
            type: CHECK_AUTH,
            payload: false,
        });
    }
};