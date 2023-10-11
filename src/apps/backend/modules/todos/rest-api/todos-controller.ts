import {
    Request, 
    Response,
    NextFunction,
} from 'express';

import TodosService from '../todos-service';

import {
    Todos,
    CreateTodosParams,
    GetAllTodosParams,
    GetTodoParams,
    UpdateTodosParams,
    DeleteTodosParams,
} from '../types';

export default class TodosController {
    public static async createTodos(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const params: CreateTodosParams = {
                accountId: req.params.accountId,
                description: req.body.description as string,
                isComplete: req.body.isComplete as boolean,
            }
            const todo: Todos = await TodosService.createTodo(params);
            res.status(201).send(TodosController.serializeTodoAsJSON(todo));
        } catch(e) {
            next(e);
        }
    }

    public static async updateTodo(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const params: UpdateTodosParams = {
                accountId: req.params.accountId,
                todosId: req.params.todosId,
                description: req.params.description,
                isComplete: req.body.isComplete as boolean,
            };
            const todo = await TodosService.updateTodo(params);
            res.status(200).send(TodosController.serializeTodoAsJSON(todo));
        } catch(e) {
            next(e);
        }
    }

    public static async deleteTodos(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const params: DeleteTodosParams = {
                accountId: req.params.accountId,
                todosId: req.params.id,
            }

            await TodosService.deleteTodo(params);

            res.status(204).send();
        } catch(e) {
            next(e);
        }
    }

    public static async getAllTodos(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const params: GetAllTodosParams = {
                accountId: req.params.accountId,
            };
            const todos = await TodosService.getTodosForAccount(params);
            res.status(200).send(todos.map((todo) => TodosController.serializeTodoAsJSON(todo)));
        } catch(e) {
            next(e);
        }
    }

    public static async getTodo(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const params: GetTodoParams = {
                accountId: req.params.accountId,
                todosId: req.params.todosId,
            };

            const todo = await TodosService.getTodoForAccount(params);

            res.status(200).send(TodosController.serializeTodoAsJSON(todo));
        } catch(e) {
            next(e);
        }      
    } 

    private static serializeTodoAsJSON(todo: Todos): unknown {
        return {
            id: todo.id,
            account: todo.account,
            description: todo.description,
        };
    }
}