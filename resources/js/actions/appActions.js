import { createAction } from 'redux-actions';

import { FETCH_CONNECTIONS } from './actionTypes';
export const fetchConnections = createAction(FETCH_CONNECTIONS.ACTION);
