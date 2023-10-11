import AppError from "../error/app-error";

export class Todos {
    id: string;
    account: string;
    description: string;
    isComplete: boolean;
}

export type GetAllTodosParams = {
    accountId: string,
}

export type GetTodoParams = {
    accountId: string,
    todosId: string,
}

export type CreateTodosParams = {
    accountId: string,
    description: string,
    isComplete: boolean,
}

export type UpdateTodosParams = {
    accountId: string,
    todosId: string,
    description: string,
    isComplete: boolean,
}

export type DeleteTodosParams = {
    accountId: string,
    todosId: string,
}

export enum TodosErrorCode {
    NOT_FOUND = 'TASK_ERR_01',
}

export class TodoNotFoundError extends AppError {
    code: TodosErrorCode;

    constructor(todosId: string) {
        super(`Todo with todoId ${todosId} not found.`);
        this.code = TodosErrorCode.NOT_FOUND;
        this.httpStatusCode = 404;
    }
}