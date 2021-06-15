import { createAction } from 'redux-actions';

import { SET_CHAT_USERS, SELECT_CONVERSATION, SELECT_CONVERSATION_BY_CALLER } from './actionTypes';
export const setChatUsers = createAction(SET_CHAT_USERS);
export const selectConversation = createAction(SELECT_CONVERSATION);
export const selectConversationByCaller = createAction(SELECT_CONVERSATION_BY_CALLER);
