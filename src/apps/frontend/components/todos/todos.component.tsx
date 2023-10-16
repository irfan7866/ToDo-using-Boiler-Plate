import React, {useState, useEffect} from 'react';
import { AccessService } from '../../services';
import './todos.component.scss';

export default function Task(): React.ReactElement {

    const [todos, setTodos] = useState([]);
    const accessService = new AccessService();

    const fetchTodos = async () => {
        const userId = localStorage.getItem('accountId');
        const token = localStorage.getItem('token');

        try {
            const response = await accessService.getAll(userId, token);
            setTodos(response.data);
        } catch(e) {
            alert(`Error occurred during fetching data: ${e}`);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    const complete = async (taskId, description, isComplete) => {
        const userId = localStorage.getItem('accountId');
        const token = localStorage.getItem('token'); 

        try {
            await accessService.update(userId, token, taskId, description, isComplete); 
        } catch(e) {
            alert(`An error occurred: ${e}`);
        }
    }

    const deleteTodo = async(itemId) => {
        try {
            const userId = localStorage.getItem('accountId');
            const token = localStorage.getItem('token');
            await accessService.delete(userId, token, itemId);
        } catch(e) {
            alert(`Error occurred during deleting task: ${e}`);
        }
    }

    return (
        <div className='task'>
            <h1>Incomplete Tasks</h1>
            {todos.filter((todo) => !todo.isComplete).map((todo) => (
                <div className='task-box'>
                    <p className='task-content'>{todo.description}</p>
                    <button className='task-complete-button' onClick={() => complete(todo.id, todo.description, !todo.isComplete)}>Complete</button>
                    <button className='task-update-button'>Update</button>
                    <button className='task-delete-button' onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
            ))}
            <br />
            <br />
            <h1>Complete Tasks</h1>
            {todos.filter((todo) => todo.isComplete).map((todo) => (
                <div className='task-box'>
                    <p className='task-content'>{todo.description}</p>
                    <button className='task-complete-button' onClick={() => complete(todo.id, todo.decription, !todo.isComplete)}>Incomplete</button>
                    <button className='task-delete-button' onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}