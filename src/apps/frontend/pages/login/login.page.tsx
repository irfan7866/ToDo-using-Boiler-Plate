import React, { useCallback, useState } from 'react';

import { useDeps } from '../../contexts';
import './login.page.scss';

export default function Login(): React.ReactElement {
  const { accessService } = useDeps();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const login = useCallback(async () => {
    setSuccess(false);
    setError(false);

    try {
      await accessService.login(username, password);
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


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './login.page.scss';

// export default function Login(): React.ReactElement {

//     const navigate = useNavigate();

//     return (
//         <div className='login-page'>

//             <h3 className='login-header'>Login Page</h3>

//             <form className='login-form'>

//                 <div className='login-block'>
//                     <label>Username:</label>
//                     <input 
//                         type='text' 
//                         placeholder='Eg: xyz@gmail.com'
//                     />
//                 </div>

//                 <div className='login-block'>
//                     <label>Password:</label>
//                     <input 
//                         type='password' 
//                         placeholder='Eg: xyz123' 
//                     />
//                 </div>

//                 <button 
//                     className='login-button' 
//                     onClick={() => navigate('/home')}
//                 >
//                     Login
//                 </button>

//             </form>

//             <p className='sign-up-redirect'>
//                 Already have an account? &nbsp;
//                 <a 
//                     onClick={() => {navigate('/signup')}}
//                     className='sign-up-redirect-tag'
//                 >
//                     Click Here
//                 </a>
//             </p>

//             </div>
//     )
// }