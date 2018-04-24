import { createReducer } from 'utils';
export const types = {
    authRequest: 'auth/Request',
    authSuccess: 'auth/Success',
    authFailure: 'auth/Failure',
    authDestroy: 'auth/Destroy',
    unAuthorized: 'auth/UnAuthorized'
};

export const authRequest = (user, toPathName, history) => ({
    type: types.authRequest,
    user,
    toPathName, 
    history
});

export const authDestroy = () => {
    console.info('authDestroy');
    return { type: types.authDestroy };
};

const initialState = {
    token: localStorage.getItem('token'),
    isloading: false,
    error: null
};

export const authReducer = createReducer(initialState, {
    [types.authRequest]: request,
    [types.authSuccess]: success,
    [types.authFailure]: error,
    [types.unAuthorized]: destroy
});

function destroy() {
    return Object.assign({}, {
        token: null,
        isloading: false,
        error: null
    });
}
function request(state) {
    return { ...state, isloading: true };
}
function success(state, action) {
    return { ...state, ...action.payload, isloading: false };
}

function error(state, action) {
    return { ...state, error: action.payload, isloading: false };
}
