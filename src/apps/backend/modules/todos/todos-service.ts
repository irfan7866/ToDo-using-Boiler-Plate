import TodosWriter from "./internal/todos-writer";
import TodosReader from "./internal/todos-reader";
import {
    Todos,
    CreateTodosParams,
    GetAllTodosParams,
    GetTodoParams,
    UpdateTodosParams,
    DeleteTodosParams,
} from './types';

export default class TodosService {
    public static async createTodo(params: CreateTodosParams): Promise<Todos> {
        return TodosWriter.createTodo(params);
    }

    public static async getTodoForAccount(params: GetTodoParams): Promise<Todos> {
        return TodosReader.getTodoForAccount(params);
    }

    public static async getTodosForAccount(params: GetAllTodosParams): Promise<Todos []> {
        return TodosReader.getTodosForAccount(params);
    }

    public static async updateTodo(params: UpdateTodosParams): Promise<Todos> {
        return TodosWriter.updateTodo(params);
    }

    public static async deleteTodo(params: DeleteTodosParams): Promise<void> {
        return TodosWriter.deleteTodo(params);
    }    
}