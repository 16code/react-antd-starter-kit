import { createReducer } from 'utils';

const types = {
    authRequest: 'auth/request',
    authSuccess: 'auth/success',
    authFailure: 'auth/failure'
};
const initialState = {
    token: localStorage.getItem('token'),
    error: null
};

export const authReducer = createReducer(initialState, {
    [types.authRequest]: authRequest,
    [types.authSuccess]: authSuccess,
    [types.authFailure]: authFailure
});

export const authActions = {
    authRequest: (user) => ({ type: types.authRequest, user }),
    authSuccess: (payload) => ({ type: types.authSuccess, payload }),
    authFailure: (payload) => ({ type: types.authFailure, payload })
};

function authSuccess(state, action) {
    return Object.assign({}, state, { token: action.payload } );
}
function authFailure(state, action) {
    return Object.assign({}, state, { error: action.payload } );
}

function authRequest(state, action) {
    console.info(action);
    return Object.assign({}, state, { user: action.user } );
}

