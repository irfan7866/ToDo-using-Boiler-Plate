import {
    Todos,
    CreateTodosParams,
    UpdateTodosParams,
    DeleteTodosParams,
    TodoNotFoundError
} from '../types'

import TodosRepository from './store/todos-repository';
import TodosUtil from './todos-util';

export default class TodosWriter {
    public static async createTodo(params: CreateTodosParams): Promise<Todos> {
        const createdTodo = await TodosRepository.todosDB.create({
            account: params.accountId,
            description: params.description,
        });

        return TodosUtil.convertTodosDBtoTodos(createdTodo);
    }

    public static async updateTodo(params: UpdateTodosParams): Promise<Todos> {
        const todo = await TodosRepository.todosDB.findOne({
            _id: params.todosId,
        });

        if(!todo) {
            throw new TodoNotFoundError(params.todosId);
        }

        todo.description = params.description;
        todo.isComplete = params.isComplete;

        const updatedTodo = await todo.save();

        return TodosUtil.convertTodosDBtoTodos(updatedTodo);
    }

    public static async deleteTodo(params: DeleteTodosParams): Promise<void> {
        const todo = await TodosRepository.todosDB.findOneAndDelete({
            _id: params.todosId,
        });

        if(!todo) {
            throw new TodoNotFoundError(params.todosId);
        }
    }
}