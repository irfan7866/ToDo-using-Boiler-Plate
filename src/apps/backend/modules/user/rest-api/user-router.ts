import { Router } from 'express';

import UserController from './user-controller';

export default class UserRouter {
    public static getRoutes(): Router {
        const router = Router();

        router.post('/', UserController.registerUser);

        return router;
    }
}