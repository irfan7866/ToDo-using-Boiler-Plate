import {Request, Response, NextFunction} from 'express';

import UserService from '../user-service';

import {
    User,
    CreateUserParams
} from '../types';

console.log("call to an user controller");



export default class UserController {
    public static async registerUser (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const {username, password}: CreateUserParams = req.body as CreateUserParams;
            const params: CreateUserParams = {username, password};
            const account = await UserService.createUser(params);
            res.status(201).send(UserController.serializeUserAsJSON(account));
        } catch(e) {
            next(e);
        }
    }

    private static serializeUserAsJSON(user: User): unknown {
        return {
            id: user.id,
            username: user.username,
        };
    }
}