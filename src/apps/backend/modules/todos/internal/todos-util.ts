import { TodosDB } from "./store/todos-db";

import { Todos } from '../types';

export default class TodosUtil {
    public static convertTodosDBtoTodos(todosDb: TodosDB): Todos {
        const todo = new Todos;
        todo.id = todosDb._id.toString();
        todo.account = todosDb.account.toString();
        todo.description = todosDb.description;
        todo.isComplete = todosDb.isComplete;
        return todo;
    }
}