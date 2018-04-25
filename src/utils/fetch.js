import fetchIntercept from 'fetch-intercept';
import { notification } from 'antd';
import AuthService from '../services/auth.service';
// import { store } from '../containers/Store';
// console.info(store.getState());

const baseConfig = {
    method: 'GET',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8'
    }
};
fetchIntercept.register({
    request: function (url, cfg = {}) {
        if (!/^\/\/[^ "]+$/.test(url)) {
            url = `//localhost:3000/api${/^\//.test(url) ? url : '/'+url}`;
        }
        const config = Object.assign({}, baseConfig, cfg);
        const user = AuthService.getUser();
        if (user && user.token) {
            config.headers.Authorization = user.token;
        }
        const { method, body, headers, params } = config;
        const methods = ['POST', 'DELETED', 'PUT', 'PATCH'];
        if(methods.includes(method) && body) {
            if(headers['Content-Type'].includes('urlencoded')) {
                config.body = objToUrlParams(body);
            } else {
                config.body = JSON.stringify(body);
            }
        } else {
            if(params) {
                url = `${url}/${objToUrlParams(params)}`;
            }
        }
        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occurred during another 'request' interceptor call
        console.info(error);
        return Promise.reject(error);
    },

    response: function (response) {
        return new Promise((resolve, reject) => {
            const status = response.status;
            switch (true) {
                case (status >= 200 && status < 300):
                    handleResponseOk(response, resolve);
                    break;
                case status === 401:
                    handleResponseError(response, reject);
                    // setTimeout(handleResponseError(response, reject), 10000);
                    break;
                default:
                    handleResponseError(response, reject);
                    break;
            }
        });
    },

    responseError: function (error) {
        // Handle an fetch error
        console.info(error);
        return Promise.reject(error);
    }
});

function handleResponseOk(response, resolve) {
    handleResponseData(response)
        .then(res => resolve(res))
        .catch(errs => resolve(errs));
}

function handleResponseError(response, reject) {
    response.json()
        .then(json => reject(handleErrorData(response, json)))
        .catch((e) => {
            console.info(e);
            reject(handleErrorData(response));
        });
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
