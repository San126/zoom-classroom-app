
import { CHECK_AUTH, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/authActions';

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_AUTH:
            return {
                ...state,
                isAuthenticated: action.payload,
            };
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return { ...state, isAuthenticated: true, user: action.payload, loading: false, error: null };
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.error };
        case LOGOUT:
            return { ...state, isAuthenticated: false, user: null };
        default:
            return state;
    }
};

export default authReducer;