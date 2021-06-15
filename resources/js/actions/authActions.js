import { createAction } from 'redux-actions';

import { LOGIN, SET_AUTH_STATE, LOGOUT } from './actionTypes';
export const login = createAction(LOGIN.ACTION);
export const setAuthState = createAction(SET_AUTH_STATE);
export const logout = createAction(LOGOUT);
