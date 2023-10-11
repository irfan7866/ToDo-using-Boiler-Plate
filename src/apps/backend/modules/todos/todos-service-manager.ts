import { Application } from 'express';

import TodosRESTApiServer from './rest-api/todos-rest-api-server';

export default class TodoServiceManager {
    public static async createRestAPIServer(): Promise<Application> {
        return TodosRESTApiServer.create();
    }
}