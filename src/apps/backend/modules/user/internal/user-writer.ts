import {
    User, 
    CreateUserParams,
} from '../types';

import UserReader from './user-reader';
import UserUtil from './user-util';
import UserRepository from './store/user-repository';

export default class UserWriter {
    public static async createUser(
        params: CreateUserParams,
    ): Promise<User> {
        await UserReader.checkUsernameNotExists(params);
        const hashedPassword = await UserUtil.hashPassword(params.password);
        const dbUser = await UserRepository.userDB.create({
            username: params.username,
            hashedPassword,
        });
        return UserUtil.convertUserDBtoUser(dbUser);
    }
}