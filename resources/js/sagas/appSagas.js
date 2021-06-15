import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_CONNECTIONS } from './../actions/actionTypes';
import apiConnections from './../api/connections';

function* fetchConnections() {
    try {
        yield put({ type: FETCH_CONNECTIONS.PENDING });
        const { data } = yield call(apiConnections);
        const { errors } = data;
        if (errors !== undefined) {
            throw {
                message: errors
                    .map((error) => {
                        return error.message;
                    })
                    .join(', '),
            };
        } else {
            yield put({
                type: FETCH_CONNECTIONS.SUCCESS,
                payload: { data },
            });
        }
    } catch (error) {
        yield put({ type: FETCH_CONNECTIONS.ERROR, payload: { error: error.message } });
    }
}

export function* watchFetchConnections() {
    yield takeLatest('FETCH_CONNECTIONS', fetchConnections);
}
