import mongoose, {CallbackError, Connection} from 'mongoose';

import { UserDB, userDBSchema } from './user-db'

import ConfigService from '../../../config/config-service';

export default class UserRepository {
    public static userDB: mongoose.Model<UserDB>;

    static async createDBConnection(): Promise<Connection> {
        return new Promise((resolve, reject) => {
            const mongoURI = ConfigService.getStringValue('mongoDb.uri');
            mongoose.createConnection(
                mongoURI,
                {},
                (error: CallbackError, result: Connection): void => {
                    if(error) {
                        reject(error);
                    } else {
                        UserRepository.userDB = result.model(
                            'User',
                            userDBSchema,
                        ) as unknown as mongoose.Model<UserDB>;
                        resolve(result);
                    }
                }
            );
        });
    };
};