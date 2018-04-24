import { encrypt, decrypt } from '../utils/index';
import { checkPermissions } from '../utils/checkPermissions';

const USER_LEVEL_KEY_NAME = 'user-level';

class AuthService {
    url = '//stg-passport.feelbus.cn/connect/token';
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
	    localStorage.removeItem('token');
	    localStorage.removeItem('user-level');
	};
	setUser(user) {        
	    return new Promise(resolve => {
	        localStorage.setItem('token', JSON.stringify(user, ['token', 'refresh_token']));
	        this.setAuthority(user.role);
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
