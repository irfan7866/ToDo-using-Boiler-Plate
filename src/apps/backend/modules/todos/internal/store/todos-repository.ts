import mongoose, { CallbackError, Connection } from 'mongoose';

import { TodosDB, todosDbSchema } from './todos-db';

import ConfigService from '../../../config/config-service';

export default class TodosRepository {
    public static todosDB: mongoose.Model<TodosDB>;

    static async createDBConnection(): Promise<Connection> {
        return new Promise((resolve, reject) => {
        const mongoURI = ConfigService.getStringValue('mongoDb.uri');
        mongoose.createConnection(
            mongoURI,
            {},
            (error: CallbackError, result: Connection): void => {
            if (error) {
                reject(error);
            } else {
                TodosRepository.todosDB = result.model(
                'Todos',
                todosDbSchema,
                ) as unknown as mongoose.Model<TodosDB>;
                resolve(result);
            }
            },
        );
        });
    }
}
