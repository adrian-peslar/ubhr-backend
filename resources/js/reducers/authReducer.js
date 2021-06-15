import { handleActions, combineActions } from 'redux-actions';
import { LOGIN, SET_AUTH_STATE, LOGOUT } from './../actions/actionTypes';

const defaultState = {
    user: null,
    loggingIn: false,
    isLoggedIn: false,
};

const loginPending = (state) => {
    return {
        ...state,
        user: null,
        loggingIn: true,
        isLoggedIn: false,
    };
};

const loginSuccess = (state, action) => {
    let appState = {
        isLoggedIn: true,
        user: action.payload.data,
    };
    localStorage['appState'] = JSON.stringify(appState);
    return {
        ...state,
        user: action.payload.data,
        isLoggedIn: true,
        loggingIn: false,
    };
};

const loginError = (state) => {
    return {
        ...state,
        user: null,
        loggingIn: false,
        isLoggedIn: false,
    };
};

const setAuthState = (state, action) => {
    return {
        ...state,
        user: action.payload.user,
        isLoggedIn: action.payload.isLoggedIn,
    };
};

const logout = (state, action) => {
    let appState = {
        isLoggedIn: false,
        user: {},
    };
    localStorage['appState'] = JSON.stringify(appState);
    return {
        ...state,
        user: null,
        loggingIn: false,
        isLoggedIn: false,
    };
};

const auth = handleActions(
    {
        [LOGIN.PENDING]: loginPending,
        [combineActions(LOGIN.CANCELLED, LOGIN.ERROR)]: loginError,
        [LOGIN.SUCCESS]: loginSuccess,
        [SET_AUTH_STATE]: setAuthState,
        [LOGOUT]: logout,
    },
    defaultState
);

export default auth;
