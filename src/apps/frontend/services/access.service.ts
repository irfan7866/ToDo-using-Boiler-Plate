import APIService from './api.service';

export default class AccessService extends APIService {
  login(username: string, password: string): Promise<any> {
    return this.apiClient.post('/access-tokens', {
      username,
      password,
    });
  }

  register(name: string, username: string, password: string): Promise<any> {
    return this.apiClient.post('/register', {
      name, 
      username, 
      password
    });
  }
}
