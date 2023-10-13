import { Router } from 'express';

import TodosController from './todos-controller';

import AccountAuthMiddleware from '../../access-token/rest-api/account-auth-middleware';

export default class TodosRouter {
    public static getRoutes(): Router {
        const router = Router({ mergeParams: true });

        router.post('/add', AccountAuthMiddleware.ensureAccess, TodosController.createTodos);
        router.get('/getall', AccountAuthMiddleware.ensureAccess, TodosController.getAllTodos);
        router.get('/get/:id', AccountAuthMiddleware.ensureAccess, TodosController.getTodo);
        router.put('/update/:id', AccountAuthMiddleware.ensureAccess, TodosController.updateTodo);
        router.delete('/:id', AccountAuthMiddleware.ensureAccess, TodosController.deleteTodos);

        return router;
    }
}