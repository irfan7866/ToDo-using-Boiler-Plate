import APIService from './api.service';

export default class AccessService extends APIService {
  //user login and registeration
  login(username: string, password: string): Promise<any> {
    return this.apiClient.post('/access-tokens', {
      username,
      password,
    });
  }

  register(name: string, username: string, password: string): Promise<any> {
    return this.apiClient.post('/accounts/register', {
      name, 
      username, 
      password
    });
  }

  //task CRUD operation
  add(userId, token, description): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    return this.apiClient.post(`/${userId}/todos/add`, {
      description,
    }, config);
  }

  getAll(userId, token): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    return this.apiClient.get(`/${userId}/todos/getAll`, config);
  }

  delete(userId, token, taskId): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return this.apiClient.delete(`/${userId}/todos/${taskId}`, config);
  }

  update(userId, token, taskId, description, isComplete): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return this.apiClient.put(`/${userId}/todos/update/${taskId}`, {
      description,
      isComplete,
    }, config);
  }
}
