import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChildComponentProps {
    user: {
        name: string,
        age: number,
        sex: string
    }
}

export default function ChildComponentUser(props: ChildComponentProps) {
    const {name, age, sex} = props.user;
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('accountId');
        if(!userId) {
            navigate('/login');
        }
        // if localStorage not exists
        // navigate to login
    }, []);

    return (
        <div>
            <h1>Hello</h1>
            <h1>{name}</h1>
            <h1>{age}</h1>
            <h1>{sex}</h1>
        </div>
    )
}