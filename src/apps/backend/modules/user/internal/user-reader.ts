import {
    User, 
    UserNotFoundError,
    UserWithUserNameExistsError,
    InvalidCredentialsError,
    SearchUserParams,
} from '../types';

import UserUtil from './user-util';
import UserRepository from './store/user-repository';

export default class UserReader {
    public static async getUserByUsername(username: string): Promise<User> {
        const dbUser = await UserRepository.userDB.findOne({username});

        if(!dbUser) {
            throw new UserNotFoundError(username);
        }

        return UserUtil.convertUserDBtoUser(dbUser);
    }

    public static async getUserByUsernamePassword(
        params: SearchUserParams,
    ): Promise<User> {
        const user = await UserReader.getUserByUsername(params.username);

        const isPasswordValid = await UserUtil.comparePassword(params.password, user.hashedPassword);

        if(!isPasswordValid) {
            throw new InvalidCredentialsError(params.username);
        } else {
            return user;
        }
    }

    public static async checkUsernameNotExists(
        params: SearchUserParams,
    ): Promise<void> {
        const dbUser = await UserRepository.userDB.findOne({
            username: params.username,
        });

        if(dbUser) {
            throw new UserWithUserNameExistsError(params.username);
        }
    }
}