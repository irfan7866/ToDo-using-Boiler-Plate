import { Application } from 'express';

import UserRESTApiServer from './rest-api/user-rest-api-server';

export default class UserServiceManager {
    public static async createRestAPIServer(): Promise<Application> {
        return UserRESTApiServer.create();
    }
}