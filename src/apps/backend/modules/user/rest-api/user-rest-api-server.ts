import bodyParser from "body-parser";
import express, { Application } from 'express';

import UserRepository from "../internal/store/user-repository";
import UserRouter from "./user-router";
import ErrorHandler from "../../error/error-handler";

export default class UserRESTApiServer {
    public static async create(): Promise<Application> {
        await UserRepository.createDBConnection();

        const app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        app.use('/user', UserRouter.getRoutes);

        app.use(ErrorHandler.AppErrorHandler);

        return Promise.resolve(app);
    }
}