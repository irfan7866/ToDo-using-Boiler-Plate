import APIService from './api.service';

export default class AccessService extends APIService {
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

  delete(userId, token, itemId): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return this.apiClient.delete(`/${userId}/todos/${itemId}`, config);
  }

  update(description, isComplete): Promise<any> {
    return this.apiClient.put('/:id/todos/update/:id', {
      description,
      isComplete,
    });
  }
}
