import React, { useCallback, useState, useEffect } from 'react';
import { useDeps } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import './login.page.scss';

export default function Login(): React.ReactElement {

  const navigate = useNavigate();
  const { accessService } = useDeps();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('accountId');
    if(userId) {
      navigate('/home');
    }
  }, []);

  const login = useCallback(async () => {
    setSuccess(false);
    setError(false);

    try {
      const object = await accessService.login(username, password);
      // setUserId(object.data.accountId);
      localStorage.setItem('token', object.data.token);
      localStorage.setItem('accountId', object.data.accountId);
      navigate(`/home`);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  }, [
    accessService,
    username,
    password,
  ]);

  return (
    <form>
      {success ? <h2 id='success'>SUCCESS!</h2> : null}
      {error ? <h2 id='error'>ERROR!</h2> : null}
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