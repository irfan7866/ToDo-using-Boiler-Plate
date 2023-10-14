import React, { useCallback, useState } from 'react';
import './input.component.scss';
import { AccessService } from '../../services';

export default function Input(): React.ReactElement {

    const [task, setTask] = useState('');
    const accessService = new AccessService();

    const addTodo = useCallback( async (e) => {
        e.preventDefault();

        try {
            const userId = localStorage.getItem('accountId');
            const token = localStorage.getItem('token');
            await accessService.add(userId, token, task);
            alert('Task added successfully');
            setTask('');
        } catch(e) {
            if(!task) {
                alert(`Please enter your task.`)
            }
            else {
                alert(`Something went wrong, Please try again with valid credentials.`);
            }
        }
    }, [accessService, task]);

    return (
        <div className='input-component'>
            <input 
                className='component-input'
                value={task}
                placeholder='Please enter your task'
                onChange={(e) => setTask(e.target.value)}
            />
            <button 
                className='component-button' 
                onClick={addTodo}
            >
                Add
            </button>
        </div>
    )
}