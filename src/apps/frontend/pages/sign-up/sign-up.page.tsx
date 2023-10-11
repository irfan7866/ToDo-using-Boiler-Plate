import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sign-up.page.scss';


export default function SignUp(): React.ReactElement {

    const navigate = useNavigate();

    return (
        <div className='sign-up-page'>

            <h3 className='sign-up-header'>Sign-Up Page</h3>

            <form className='sign-up-form'>

                <div className='sign-up-block'>
                    <label>Enter your name:</label>
                    <input 
                        type='text' 
                        placeholder='Eg: Irfan Gouri'
                    />
                </div>

                <div className='sign-up-block'>
                    <label>Enter your email:</label>
                    <input 
                        type='text' 
                        placeholder='Eg: xyz@gmail.com'
                    />
                </div>

                <div className='sign-up-block'>
                    <label>Enter your password:</label>
                    <input 
                        type='password' 
                        placeholder='Eg: xyz123' 
                    />
                </div>

                <div className='sign-up-block'>
                    <label>Confirm password:</label>
                    <input 
                        type='password' 
                        placeholder='Eg: xyz123' 
                    />
                </div>

                <button 
                    className='sign-up-button' 
                    onClick={() => navigate('/home')}
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