import pathToRegexp from 'path-to-regexp';

/**
 * urlToList
 * @param {string} url - location.pathname
 * @example
 * "/form/basic-form" => ["/form", "/form/basic-form"]
 */
export function urlToList(url) {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => {
        return `/${urllist.slice(0, index + 1).join('/')}`;
    });
}

export function createReducer(initialState, handlers) {
    return (state = initialState, action) => (
        handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state
    );
}

/**
 * 字符串加密
 * @param {string} str
 */
export function encrypt(str) {
    let c = String.fromCharCode(str.charCodeAt(0) + str.length);
    for (let i = 1; i < str.length; i++) {
        c += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i - 1));
    }
    return c;
}
/**
 * 字符串解密
 * @param {string} str
 */
export function decrypt(str) {
    let c = String.fromCharCode(str.charCodeAt(0) - str.length);
    for (let i = 1; i < str.length; i++) {
        c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export { pathToRegexp, delay };
