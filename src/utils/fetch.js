import { notification } from 'antd';
import { types as authTypes } from 'reducers/auth';
import fetchIntercept from '../utils/fetch-intercept';
import AuthService from '../services/auth.service';
import { store } from '../containers/Store';
const API_GATEWAY = '//localhost:3000/api';
function isUrl(url) {
    const urlRegex = /^http(s)?|^\/\//;
    return urlRegex.test(url);
}
fetchIntercept.register({
    request: function(url, cfg = {}) {
        const baseConfig = {
            method: 'GET',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        if (!isUrl(url)) {
            url = `${API_GATEWAY}${/^\//.test(url) ? url : '/' + url}`;
        }
        const config = Object.assign({}, baseConfig, cfg);
        const user = AuthService.getUser();
        if (user && user.token) {
            config.headers.Authorization = user.token;
        }
        const { method, body, headers, params } = config;
        const methods = ['POST', 'DELETED', 'PUT', 'PATCH'];
        if (methods.includes(method) && body) {
            if (headers['Content-Type'].includes('urlencoded')) {
                config.body = objToUrlParams(body);
            } else {
                config.body = JSON.stringify(body);
            }
        }
        if (params) {
            url = `${url}?${objToUrlParams(params)}`;
        }
        return [url, config];
    },

    requestError: function(error) {
        console.info(error);
        return Promise.reject(error);
    },

    response: function(response, requestArgs) {
        const status = response.status;
        return new Promise((resolve, reject) => {
            switch (true) {
                case status >= 200 && status < 300:
                    resolve(handleResponseOk(response));
                    break;
                case status === 401:
                    handleRefreshToken(requestArgs, resolve, reject);
                    break;
                default:
                    reject(handleResponseError(response));
                    break;
            }
        });
    },

    responseError: function(error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
});

function handleWatchState(requestArgs, resolve, reject) {
    const unSubscribe = store.subscribe(() => {
        if (!(store.getState().auth.isRefreshing)) {
            unSubscribe();
            fetch(...requestArgs).then(resolve).catch(reject);
        }
    });
}
function handleRefreshToken(requestArgs, resolve, reject) {
    const { auth: { isRefreshing } } = store.getState();
    if (isRefreshing) { 
        handleWatchState(requestArgs, resolve, reject);
    } else {
        store.dispatch({ type: authTypes.authRefreshToken });
        AuthService.refreshToken()
            .then(res => {
                store.dispatch({ type: authTypes.authRefreshTokenSuccess, user: res });
                fetch(...requestArgs).then(resolve).catch(reject);
            })
            .catch((err) => {
                reject(err);
                store.dispatch({ type: authTypes.authRefreshTokenFailure });
            });
    }
}

function handleResponseOk(response) {
    return handleResponseData(response)
        .then(res => res)
        .catch(errs => errs);
}

function handleResponseError(response) {
    return response
        .json()
        .then(json => handleErrorData(response, json))
        .catch(() => handleErrorData(response));
}
function handleResponseData(response) {
    const contentType = response.headers.get('content-type');

    if (!contentType) {
        return response.text();
    }

    if (contentType.includes('application/json')) {
        return response.json();
    } else {
        return response.blob();
    }
}

function handleErrorData(response, json) {
    const errorInfo = {
        status: response.status,
        statusText: response.statusText,
        msg: null
    };
    if (response.status >= 500) {
        errorInfo.msg = response.statusText;
    } else {
        if (Array.isArray(json)) {
            json.forEach(err => {
                errorInfo.msg = err.error_description;
            });
        } else {
            errorInfo.msg = json.error_description;
        }
    }
    notification.error({
        message: `${errorInfo.status} ${errorInfo.statusText}`,
        description: errorInfo.msg,
        duration: 4
    });
    return errorInfo;
}

function objToUrlParams(obj) {
    const keys = Object.keys(obj).filter(key => !!obj[key]);
    const data = keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    return data.join('&');
}
