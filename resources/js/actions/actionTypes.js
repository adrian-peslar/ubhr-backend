import { defineAction } from 'redux-define';
import { CANCELLED, ERROR, PENDING, SUCCESS } from './stateConstants';

export const LOGIN = defineAction('LOGIN', [CANCELLED, ERROR, PENDING, SUCCESS]);
export const FETCH_CONNECTIONS = defineAction('FETCH_CONNECTIONS', [CANCELLED, ERROR, PENDING, SUCCESS]);
export const SET_AUTH_STATE = defineAction('SET_AUTH_STATE');
export const LOGOUT = defineAction('LOGOUT');
export const SET_CHAT_USERS = defineAction('SET_CHAT_USERS');
export const SELECT_CONVERSATION = defineAction('SELECT_CONVERSATION');
export const SELECT_CONVERSATION_BY_CALLER = defineAction('SELECT_CONVERSATION_BY_CALLER');
