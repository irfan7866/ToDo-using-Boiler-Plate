import React from 'react';

interface ChildComponentProps {
    user: {
        name: string,
        age: number,
        sex: string
    }
}

export default function ChildComponentUser(props: ChildComponentProps) {
    const {name, age, sex} = props.user;
    return (
        <div>
            <h1>Hello</h1>
            <h1>{name}</h1>
            <h1>{age}</h1>
            <h1>{sex}</h1>
        </div>
    )
}