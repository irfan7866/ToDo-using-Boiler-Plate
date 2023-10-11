import React from 'react';
import ChildComponentUser from './home.component';

export default function Home() {
    const user = {
        name: "Irfan Gouri",
        age: 21,
        sex: "Male",
    }
    return (
        <div>
            <h1>Hello, welcome to the home page</h1>
            <ChildComponentUser user={user} />
        </div>
    )
}