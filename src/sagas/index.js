import { call, put, takeLatest } from 'redux-saga/effects';

const AUTH_REQUEST = 'auth/request';
const AUTH_SUCCESS = 'auth/success';
const AUTH_FAILURE = 'auth/failure';

const fetchJSON = (url, options = {}) =>
    new Promise((resolve, reject) => {
        return fetch(url, options)
            .then(response => (response.status !== 200 ? reject(response) : response))
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(error => reject(error));
    });

function* authorize({ user }) {
    console.info(user);
    const options = {
        body: JSON.stringify(user),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        const { token } = yield call(fetchJSON, '/login', options);
        yield put({ type: AUTH_SUCCESS, payload: token });
        localStorage.setItem('token', token);
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = 'Something went wrong';
        }
        yield put({ type: AUTH_FAILURE, payload: message });
        localStorage.removeItem('token');
    }
}

function* Saga() {
    yield takeLatest(AUTH_REQUEST, authorize);
}

export default Saga;