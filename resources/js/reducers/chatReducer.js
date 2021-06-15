import { handleActions, combineActions } from 'redux-actions';
import {
    FETCH_CONNECTIONS,
    SET_CHAT_USERS,
    SELECT_CONVERSATION,
    SELECT_CONVERSATION_BY_CALLER,
} from './../actions/actionTypes';

const defaultState = {
    conversations: null,
    conversationsFetching: false,
    chatUsers: [],
    chatUsersOnlineMap: [],
    selectedConversation: null,
};

const fetchConnectionsPending = (state) => {
    return {
        ...state,
        conversations: null,
        conversationsFetching: true,
    };
};

const fetchConnectionsSuccess = (state, action) => {
    const conversations = action.payload.data.users.map((user) => {
        return { with: user, lastMessage: '.' };
    });
    return {
        ...state,
        conversations,
        conversationsFetching: false,
    };
};

const fetchConnectionsError = (state) => {
    return {
        ...state,
        conversations: null,
        conversationsFetching: false,
    };
};

const setChatUsers = (state, action) => {
    let chatUsersOnlineMap = [];
    action.payload.users.forEach((user) => {
        chatUsersOnlineMap.push(user.userId);
    });
    return {
        ...state,
        chatUsers: action.payload.users,
        chatUsersOnlineMap,
    };
};

const selectConversation = (state, action) => {
    return {
        ...state,
        selectedConversation: action.payload.conversation,
    };
};

const selectConversationByCaller = (state, action) => {
    console.log('action.payload.caller', action.payload.caller);
    console.log('state.chatUsers', state.chatUsers);
    let user = null;
    let selectedConversation = null;
    state.chatUsers.forEach((u) => {
        if (u.socketId === action.payload.caller) {
            user = u;
            return;
        }
    });
    if (user !== null && state.conversations !== null) {
        state.conversations.forEach((conv) => {
            if (conv && conv.with.id === user.userId) {
                selectedConversation = conv;
                return;
            }
        });
    }

    return {
        ...state,
        selectedConversation,
    };
};

const auth = handleActions(
    {
        [FETCH_CONNECTIONS.PENDING]: fetchConnectionsPending,
        [combineActions(FETCH_CONNECTIONS.CANCELLED, FETCH_CONNECTIONS.ERROR)]: fetchConnectionsError,
        [FETCH_CONNECTIONS.SUCCESS]: fetchConnectionsSuccess,
        [SET_CHAT_USERS]: setChatUsers,
        [SELECT_CONVERSATION]: selectConversation,
        [SELECT_CONVERSATION_BY_CALLER]: selectConversationByCaller,
    },
    defaultState
);

export default auth;
