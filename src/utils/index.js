import pathToRegexp from 'path-to-regexp';

export function urlToList(url) {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => {
        return `/${urllist.slice(0, index + 1).join('/')}`;
    });
}

export { pathToRegexp };
