import pathToRegexp from 'path-to-regexp';

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

export { pathToRegexp };
