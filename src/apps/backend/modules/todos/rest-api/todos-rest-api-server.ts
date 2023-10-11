import bodyParser from "body-parser";

import express, { Application } from 'express';

import ErrorHandler from "../../error/error-handler";

import TodosRouter from "./todos-router";

import TodosRepository from "../internal/store/todos-repository";

export default class TodosRESTApiServer {
    public static async create(): Promise<Application> {
        await TodosRepository.createDBConnection();

        const app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        app.use('/:accountId/todos', TodosRouter.getRoutes());

        app.use(ErrorHandler.AppErrorHandler);

        return Promise.resolve(app);

    }
}