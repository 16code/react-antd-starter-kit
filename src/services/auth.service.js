import { encrypt, decrypt } from '../utils/index';
import { checkPermissions } from '../utils/checkPermissions';

const USER_LEVEL_KEY_NAME = 'USER_LEVEL';
const USER_TOKEN_KEY_NAME = 'USER_TOKEN';
const ONLY_CACHED_KEYS = ['token', 'refresh_token', 'role'];

class AuthService {
    url = '//localhost:3000/api/login';
    options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
    };
    login = user => {
        return new Promise((resolve, reject) =>
            fetch(this.url, { ...this.options, body: user })
                .then(resolve)
                .catch(reject)
        );
    };
    logout = () => {
        return new Promise(resolve => {
            localStorage.removeItem(USER_TOKEN_KEY_NAME);
            localStorage.removeItem(USER_LEVEL_KEY_NAME);
            resolve();
        });
    };
    getUser() {
        let parsed;
        try {
            parsed = JSON.parse(localStorage.getItem(USER_TOKEN_KEY_NAME));
            parsed.role = decrypt(parsed.role);
        } catch (error) {
            parsed = null;
        }
        return parsed;
    }
    setUser(user) {
        return new Promise(resolve => {
            const copy = `${user.role}`;
            user.role = encrypt(user.role);
            localStorage.setItem(USER_TOKEN_KEY_NAME,
                JSON.stringify(user, ONLY_CACHED_KEYS));
            this.setAuthority(copy);
            resolve();
        });
    }
    getAuthority() {
        const authority = localStorage.getItem(USER_LEVEL_KEY_NAME);
        return (authority && decrypt(authority)) || 'guest';
    }
    setAuthority(authority) {
        return localStorage.setItem(USER_LEVEL_KEY_NAME, encrypt(authority));
    }
    check(roles, curRole, target) {
        return checkPermissions(roles, curRole, target);
    }
}

export default new AuthService();
