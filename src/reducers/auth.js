import { createReducer } from 'utils/index';
import AuthService from 'services/auth.service';

export const types = {
    userLogin: 'user/login',
    userLogout: 'user/logout',
    userLoginSuccess: 'user/loginSuccess',
    userLoginFailure: 'user/loginFailure',
    clearUserData: 'user/clearUserData'
};

const initialState = {
    token: AuthService.getUser(),
    isloading: false,
    error: null
};

// actions
export const userActions = {
    userLogin: (user, rest) => ({
        type: types.userLogin,
        payload: { user, ...rest }
    }),
    userLogout: () => ({ type: types.userLogout })
};

// Reducers
export const authReducer = createReducer(initialState, {
    [types.userLogin]: login,
    [types.userLoginSuccess]: success,
    [types.userLoginFailure]: failure,
    [types.clearUserData]: clearUserData
});

function clearUserData() {
    return Object.assign({}, {
        token: null,
        isloading: false,
        error: null
    });
}
function login(state) {
    return { ...state, isloading: true };
}
function success(state, action) {
    return { ...state, ...action.payload, isloading: false };
}
function failure(state, action) {
    return { ...state, error: action.payload, isloading: false };
}
