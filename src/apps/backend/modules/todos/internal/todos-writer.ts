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
            isComplete: params.isComplete,
        });

        return TodosUtil.convertTodosDBtoTodos(createdTodo);
    }

    public static async updateTodo(params: UpdateTodosParams): Promise<Todos> {
        console.log(params.description);
        console.log(params.isComplete);
        const updatedTodo = await TodosRepository.todosDB.findOneAndUpdate(
            {
                _id: params.todosId,
            },
            {
                $set: {
                    description: params.description,
                    isComplete: params.isComplete,
                }
            },
            {
                new: true,
            }
        );

        if(!updatedTodo) {
            throw new TodoNotFoundError(params.todosId);
        }

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