import fetchIntercept from 'fetch-intercept';
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
            url = `//stg.feelbus.cn${/^\//.test(url) ? url : '/'+url}`;
        }
        const config = Object.assign({}, baseConfig, cfg);
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
        .catch(() => reject(handleErrorData(response)));
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
    const errorInfos = {
        status: response.status,
        statusText: response.statusText,
        msg: null
    };
    if (response.status >= 500) {
        errorInfos.msg = response.statusText;
    } else {
        if (Array.isArray(json)) {
            json.forEach(err => {
                errorInfos.msg = err.error_description;
            });
        } else if (json !== null && typeof json === 'object' 
			&& Object.prototype.toString.toString.call(json) === '[object Object]') {
            errorInfos.msg = json.error_description;
        }
    }
    return errorInfos;
}

function objToUrlParams(obj) {
    const keys = Object.keys(obj).filter(key => !!obj[key]);
    const data = keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    return data.join('&');
}
