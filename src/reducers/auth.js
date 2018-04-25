import { createReducer } from 'utils/index';
import AuthService from 'services/auth.service';

export const types = {
    userLogin: 'user/login',
    userLogout: 'user/logout',
    userLoginSuccess: 'user/loginSuccess',
    userLoginFailure: 'user/loginFailure',
    userRefreshToken: 'user/refreshToken',
    userRefreshTokenSuccess: 'user/refreshTokenSuccess',
    userRefreshTokenFailure: 'user/refreshTokenFailure',
    clearUserData: 'user/clearUserData'
};

const initialState = {
    ...AuthService.getUser(),
    isRefreshing: false,
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
    [types.userRefreshToken]: refreshToken,
    [types.userRefreshTokenSuccess]: refreshTokenSuccess,
    [types.userRefreshTokenFailure]: clearUserData,
    [types.clearUserData]: clearUserData
});

function refreshToken(state) {
    return { ...state, isRefreshing: true };
}
function refreshTokenSuccess(state, action) {
    return { ...state, ...action.user, isRefreshing: false };
}
function clearUserData() {
    return { isloading: false, isRefreshing: true, error: null, token: null };
}

function login(state) {
    return { ...state, isloading: true };
}
function success(state, action) {
    return { ...state, ...action.payload, isloading: false, isRefreshing: false };
}
function failure(state, action) {
    return { ...state, error: action.payload, isloading: false };
}
