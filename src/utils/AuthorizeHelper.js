import { checkPermissions } from './CheckPermissions';
const KEY_NAME = 'user-level';
export function getAuthority() {
    return localStorage.getItem(KEY_NAME) || 'admin';
}

export function setAuthority(authority) {
    return localStorage.setItem(KEY_NAME, authority);
}

export const authorizeHelper = {
    check(roles, curRole, target) {
        return checkPermissions(roles, curRole, target);
    }
};
