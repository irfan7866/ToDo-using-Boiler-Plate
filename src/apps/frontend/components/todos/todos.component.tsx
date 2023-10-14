import React, {useState, useEffect} from 'react';
import { AccessService } from '../../services';

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
            {todos.map((todo) => (
                <div>
                    <p className='task-content'>{todo.description}</p>
                    <button className='task-completed-button'>Complete</button>
                    <button className='task-update-button'>Update</button>
                    <button className='task-delete-button' onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}