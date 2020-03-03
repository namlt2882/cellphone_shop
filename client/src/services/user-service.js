import { Request } from './../utils/request'

export const UserService = {
    isLoggedIn: () => {
        let token = localStorage.getItem('token')
        if (token) {
            return true
        }
        return false
    },
    removeJwt: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
    },
    login: (username, password) => {
        return Request().post('user/login', {
            'username': username,
            'password': password
        }).then(res => {
            let data = res.data

            let token = data.token;
            let role = data.role;
            let name = data.name;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('name', name);
        });
    }
}