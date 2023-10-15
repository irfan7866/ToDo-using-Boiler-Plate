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

  const login = useCallback(async (e) => {
    e.preventDefault();

    try {
      const object = await accessService.login(username, password);
      localStorage.setItem('token', object.data.token);
      localStorage.setItem('accountId', object.data.accountId);
      navigate(`/home`);
    } catch (e) {
      if(!username || !password) {
        alert(`Please enter username and password.`);
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
    <div className='login-page'>

      <h3 className='login-header'>Login Page</h3>

      <form className='login-form'>

        <div className='login-block'>
          <label>Enter your username:</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Eg: Irfan Gouri'
          />
        </div>

        <div className='login-block'>
          <label>Enter your password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Eg: xyz123'
          />
        </div>  

        <button
          className='login-button'
          onClick={login}
        >
          Login
        </button>

      </form>

      <p className='sign-up-redirect'>
        Already have an account? &nbsp;
        <a 
          onClick={() => navigate('/signup')}
          className='sign-up-redirect-tag'
        >
          Click Here
        </a>
      </p>

    </div>
  );
}