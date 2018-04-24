import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from 'reducers/auth';
import AuthService from 'services/auth.service';
/* eslint-disable */
function* authorize({ user, toPathName, history }) {
    try {
        const response = yield call(AuthService.login, user);
        /* eslint-disable camelcase */
        const { id_token, refresh_token, user_name, m_role, feiniu_user_id } = response;
        const loggedInUser = {
            token: id_token,
            refresh_token,
            user_name,
            role: m_role.toLowerCase(),
            uid: feiniu_user_id
        };
        yield put({
            type: types.authSuccess,
            payload: loggedInUser
        });
		yield AuthService.setUser(loggedInUser);
        history.push({ pathname: toPathName });
    } catch (error) {
        yield put({ type: types.authFailure, payload: error });
        localStorage.removeItem('token');
    }
}

export function* authSaga() {
    yield takeLatest(types.authRequest, authorize);
}
