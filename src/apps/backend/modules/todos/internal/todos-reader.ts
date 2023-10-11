import {
    Todos,
    GetAllTodosParams,
    GetTodoParams,
    TodoNotFoundError
} from '../types';

import TodosUtil from '../../todos/internal/todos-util';
import TodosRepository from './store/todos-repository';

export default class TodosReader {
    public static async getTodoForAccount(params: GetTodoParams): Promise<Todos> {
        const todos = await TodosRepository.todosDB.findOne({
            _id: params.todosId,
            account: params.accountId,
        });
        
        if(!todos) {
            throw new TodoNotFoundError(params.todosId);
        }

        return TodosUtil.convertTodosDBtoTodos(todos);
    }

    public static async getTodosForAccount(params: GetAllTodosParams): Promise<Todos []> {

        const todos = await TodosRepository.todosDB.find({
            account: params.accountId,
        })

        return todos.map((todo) => TodosUtil.convertTodosDBtoTodos(todo));
    }
}