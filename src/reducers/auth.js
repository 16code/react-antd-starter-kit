import { createReducer } from 'utils';
export const types = {
    authRequest: 'auth/Request',
    authSuccess: 'auth/Success',
    authFailure: 'auth/Failure'
};

export const authRequest = (user, toPathName, history) => ({
    type: types.authRequest,
    user,
    toPathName, 
    history
});

const initialState = {
    token: localStorage.getItem('token'),
    isloading: false,
    error: null
};

export const authReducer = createReducer(initialState, {
    [types.authRequest]: request,
    [types.authSuccess]: success,
    [types.authFailure]: error
});

function request(state) {
    return { ...state, isloading: true };
}
function success(state, action) {
    return { ...state, ...action.payload, isloading: false };
}

function error(state, action) {
    return { ...state, error: action.payload, isloading: false };
}
