import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.page.scss';
import { AccessService } from '../../services';

export default function Login(): React.ReactElement {

  const navigate = useNavigate();
  const accessService = new AccessService();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('accountId');
    if(userId) {
      navigate('/home');
    }
  }, []);

  const login = useCallback(async () => {

    try {
      const object = await accessService.login(username, password);
      localStorage.setItem('token', object.data.token);
      localStorage.setItem('accountId', object.data.accountId);
      navigate(`/home`);
    } catch (e) {
      if(!username || !password) {
        alert(`Please enter username and password.`)
      }
      else if(e.response.status == 404) {
        alert(`User Not Found`);
      }
      else if(e.response.status === 401) {
        alert(`Invalid Credentials. Please try again.`);
      }
      console.log(e);
    }
  }, [
    accessService,
    username,
    password,
  ]);

  return (
    <form>
      <input
        onChange={(e) => setUsername(e.target.value)}
        id='username'
        value={username}
        type='text'
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        id='password'
        value={password}
        type='password'
      />
      <button type='button' onClick={login}>
        LOGIN
      </button>
    </form>
  );
}