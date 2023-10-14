import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './sign-up.page.scss';
import { AccessService } from '../../services';


export default function SignUp(): React.ReactElement {

    const navigate = useNavigate();
    const accessService = new AccessService();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('accountId');
        if(userId) {
            navigate('/home');
        }
    }, []);

    const signup = useCallback(async (e) => {
        e.preventDefault();

        try {
            await accessService.register(name, username, password);

            const object = await accessService.login(username, password);

            localStorage.setItem('token', object.data.token);
            localStorage.setItem('accountId', object.data.accountId);

            navigate(`/home`);
        } catch(e) {
            if(!name || !username || !password) {
                alert(`Please enter all the fields`);
            }
            else if(e.response.status === 409) {
                alert(`This username is already registered. Please with different username.`)
            }
            else {
                console.log(`An error occurred. Please try again.`);
            }
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