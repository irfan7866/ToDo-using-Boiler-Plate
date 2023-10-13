import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeps } from '../../contexts';
import './sign-up.page.scss';


export default function SignUp(): React.ReactElement {

    const navigate = useNavigate();
    const { accessService } = useDeps();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('accountId');
        if(userId) {
            navigate('/home');
        }
    }, []);

    const signup = useCallback(async () => {
        setSuccess(false);
        setError(false);

        console.log(password);
        console.log(confirmPassword);

        if(password !== confirmPassword) {
            console.log(`Your passwords are change. Please enter same password in both the fields`);
        }

        console.log(success);
        console.log(error);

        try {
            const Object = await accessService.login(username, password);
            localStorage.setItem('token', Object.data.token);
            localStorage.setItem('accountId', Object.data.accountId);
            navigate(`/home`);
            setSuccess(true);
        } catch(e) {
            setError(true);
        }
    }, [accessService, name, username, password])

    return (
        <div className='sign-up-page'>

            <h3 className='sign-up-header'>Sign-Up Page</h3>

            <form className='sign-up-form'>

                <div className='sign-up-block'>
                    <label>Enter your name:</label>
                    <input 
                        type='text' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Eg: Irfan Gouri'
                    />
                </div>

                <div className='sign-up-block'>
                    <label>Enter your email:</label>
                    <input 
                        type='text' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Eg: xyz@gmail.com'
                    />
                </div>

                <div className='sign-up-block'>
                    <label>Enter your password:</label>
                    <input 
                        type='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Eg: xyz123' 
                    />
                </div>

                <div className='sign-up-block'>
                    <label>Confirm password:</label>
                    <input 
                        type='password' 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Eg: xyz123' 
                    />
                </div>

                <button 
                    className='sign-up-button' 
                    onClick={signup}
                >
                    Sign-Up
                </button>

            </form>

            <p className='login-redirect'>
                Don't have an account? &nbsp;
                <a 
                    onClick={() => {navigate('/')}}
                    className='login-redirect-tag'
                >
                    Click Here
                </a>
            </p>

        </div>
    )
}