import { handleActions, combineActions } from 'redux-actions';
import { FETCH_CONNECTIONS } from './../actions/actionTypes';

const defaultState = {
    connections: null,
    connectionsFetching: false,
};

const fetchConnectionsPending = (state) => {
    return {
        ...state,
        connections: null,
        connectionsFetching: true,
    };
};

const fetchConnectionsSuccess = (state, action) => {
    return {
        ...state,
        connections: action.payload.data,
        connectionsFetching: false,
    };
};

const fetchConnectionsError = (state) => {
    return {
        ...state,
        connections: null,
        connectionsFetching: false,
    };
};

const auth = handleActions(
    {
        [FETCH_CONNECTIONS.PENDING]: fetchConnectionsPending,
        [combineActions(FETCH_CONNECTIONS.CANCELLED, FETCH_CONNECTIONS.ERROR)]: fetchConnectionsError,
        [FETCH_CONNECTIONS.SUCCESS]: fetchConnectionsSuccess,
    },
    defaultState
);

export default auth;
