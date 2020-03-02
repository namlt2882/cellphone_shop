import { Request, AuthRequest } from './../utils/request'

export const UserService = {
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