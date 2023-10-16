import React, { useCallback, useState, useEffect } from 'react';
import './tasks.component.scss';
import { AccessService } from '../../services';

export default function Tasks(): React.ReactElement {

    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);
    const [updateTaskId, setUpdateTaskId] = useState(null);
    const [updatedDesc, setUpdatedDesc] = useState('');
    const accessService = new AccessService();

    const addTodo = useCallback( async (e) => {
        e.preventDefault();

        try {
            const userId = localStorage.getItem('accountId');
            const token = localStorage.getItem('token');
            await accessService.add(userId, token, task);
            alert('Task added successfully');
            setTask('');
            fetchTodos();
        } catch(e) {
            if(!task) {
                alert(`Please enter your task.`)
            }
            else {
                alert(`Something went wrong, Please try again with valid credentials.`);
            }
        }
    }, [accessService, task]);

    const fetchTodos = async () => {
        const userId = localStorage.getItem('accountId');
        const token = localStorage.getItem('token');

        try {
            const response = await accessService.getAll(userId, token);
            setTodos(response.data);
        } catch(e) {
            alert(`Error occurred during fetching the data: ${e}`);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    const complete = async (taskId, description, isComplete) => {
        const userId = localStorage.getItem('accountId');
        const token = localStorage.getItem('token');
        
        try {
            await accessService.update(userId, token, taskId, description, isComplete);
            fetchTodos();
        } catch(e) {
            alert(`An error occurred: ${e}`);
        }
    }

    const update = async (taskId, currentDesc) => {
        setUpdateTaskId(taskId);
        setUpdatedDesc(currentDesc);
    }

    const cancel = () => {
        setUpdateTaskId(null);
        setUpdatedDesc(updatedDesc);
    }

    const save = async(taskId, isComplete) => {
        const userId = localStorage.getItem('accountId');
        const token = localStorage.getItem('token');

        try {
            const response = await accessService.update(userId, token, taskId, updatedDesc, isComplete);
            console.log(response);
            setUpdateTaskId(null);
            setUpdatedDesc('');
            fetchTodos();
        } catch(e) {
            alert(`An error occurred while updating the task, Please try again.`)
        }
    }

    const deleteTodo = async (taskId) => {
        const userId = localStorage.getItem('accountId');
        const token = localStorage.getItem('token');

        try {
            await accessService.delete(userId, token, taskId);
            fetchTodos();
        } catch(e) {
            alert(`Error occurred during deleting task: ${e}`);
        }
    }

    return (
        <div>
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
            <div className='task'>
                <h1>Incomplete Tasks</h1>
                {todos.filter((todo) => !todo.isComplete).map((todo) => (
                    <div>
                        {updateTaskId === todo.id ? (
                            <div  className='task-box'>
                                <input 
                                    value={updatedDesc}
                                    onChange={(e) => setUpdatedDesc(e.target.value)}
                                    className='updated-input'
                                />
                                <button
                                    className='task-button'
                                    onClick={() => save(todo.id, todo.isComplete)}
                                >Save</button>
                                <button
                                    className='task-button'
                                    onClick={() => cancel()}
                                >Cancel</button>
                            </div>                            
                        ) : (
                            <div  className='task-box'>
                                <p className='task-content'>{todo.description}</p>
                                <button 
                                    className='task-button' 
                                    onClick={() => complete(todo.id, todo.description, !todo.isComplete)}
                                >Complete</button>
                                <button 
                                    className='task-button'
                                    onClick={() => update(todo.id, todo.description)}
                                >Update</button>
                                <button 
                                    className='task-button' 
                                    onClick={() => deleteTodo(todo.id)}
                                >Delete</button>
                            </div>
                        )}
                    </div>
                ))}
                <br />
                <br />
                <h1>Complete Tasks</h1>
                {todos.filter((todo) => todo.isComplete).map((todo) => (
                    <div className='task-box'>
                        <p className='task-content'>{todo.description}</p>
                        <button 
                            className='task-button' 
                            onClick={() => complete(todo.id, todo.decription, !todo.isComplete)}
                        >Incomplete</button>
                        <button 
                            className='task-button' 
                            onClick={() => deleteTodo(todo.id)}
                        >Delete</button>
                    </div>
                ))}
            </div>
        </div>
        
    )
}