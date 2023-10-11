import UserReader from "./internal/user-reader";
import UserWriter from "./internal/user-writer";
import {
    User,
    CreateUserParams,
    SearchUserParams
} from './types';

export default class UserService {

    public static async createUser(
        params: CreateUserParams,
    ): Promise<User> {
        console.log("Here we are inside of a user service call to create an user.");
        return UserWriter.createUser(params);
    }

    public static async getUserByUsernamePassword(
        params: SearchUserParams,
    ): Promise<User> {
        return UserReader.getUserByUsernamePassword(params);
    }

}