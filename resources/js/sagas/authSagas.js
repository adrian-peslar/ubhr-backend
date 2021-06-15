import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN } from './../actions/actionTypes';
import apiLogin from './../api/login';

function* login({ payload }) {
    const { userData } = payload;
    try {
        yield put({ type: LOGIN.PENDING });
        const { data, status } = yield call(apiLogin, userData);
        console.log('status', status);
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
            console.log('success', data);
            yield put({
                type: LOGIN.SUCCESS,
                payload: { data },
            });
        }
    } catch (error) {
        yield put({ type: LOGIN.ERROR, payload: { error: error.message } });
    }
}

export function* watchLogin() {
    yield takeLatest('LOGIN', login);
}
