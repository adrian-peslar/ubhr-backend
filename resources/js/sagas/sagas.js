import { all, fork } from 'redux-saga/effects';

import { watchLogin } from './authSagas';
import { watchFetchConnections } from './appSagas';

function* sagas() {
    yield all([fork(watchLogin)]);
    yield all([fork(watchFetchConnections)]);
}

export default sagas;
