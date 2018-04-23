import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from 'reducers/auth';

const fetchUser = (url, options = {}) =>
    new Promise((resolve, reject) => {
        return fetch(url, options)
            .then(resolve)
            .catch(reject);
    });

function* authorize({ user, toPathName, history }) {
    const options = {
        body: user,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
    };

    try {
        const response = yield call(fetchUser, '//stg-passport.feelbus.cn/connect/token', options);
        /* eslint-disable camelcase */
        const { id_token, refresh_token, user_name, m_role, feiniu_user_id } = response;
        const user = {
            token: id_token,
            refresh_token,
            user_name,
            role: m_role,
            uid: feiniu_user_id
        };
        yield put({
            type: types.authSuccess,
            payload: user
        });
        localStorage.setItem('token', JSON.stringify(user));
        history.push({ pathname: toPathName });
    } catch (error) {
        yield put({ type: types.authFailure, payload: error });
        localStorage.removeItem('token');
    }
}

export function* authSaga() {
    yield takeLatest(types.authRequest, authorize);
}
