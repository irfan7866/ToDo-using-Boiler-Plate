import * as bcrypt from 'bcrypt';

import { UserDB } from './store/user-db';

import { User } from '../types';

export default class UserUtil {

    public static convertUserDBtoUser(userDB: UserDB): User {
        const user = new User();
        user.id = userDB._id.toString();
        user.username = userDB.username;
        user.hashedPassword = userDB.hashedPassword;
        return user;
    }

    public static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    public static async comparePassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

}