import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.page.scss'
import Input from '../../components/input/input.component';
import Todos from '../../components/todos/todos.component';

export default function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('token');
        if(!user) {
            navigate('/');
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('accountId');
        navigate('/');
    }

    return (
        <div>
            
            <div className='home-page-navbar'>
                <h3 className='navbar-header'>Todos</h3>
                <button onClick={handleLogout} className='navbar-button'>Logout</button>
            </div>

            <Input />

            <Todos />

        </div>
    )
}