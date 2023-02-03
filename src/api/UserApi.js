import http from '../utils/http';

export default class UserApi {
  static register(body) {
    return http().post('/user/register', body);
  }

  static login(body) {
    return http().post('/user/login', body);
  }

  static getUser() {
    return http(true).get('/user');
  }

  static editUser(body) {
    return http(true).patch('/user/edit', body);
  }

  static changePassword(body) {
    return http(true).patch('/user/password', body);
  }

  static deleteUser(password) {
    return http(true).delete('/user', {
      data: { password },
    });
  }
}
