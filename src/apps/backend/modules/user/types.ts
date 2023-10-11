import AppError from "../error/app-error";

export class User {
    id: string;
    username: string;
    hashedPassword: string;
}

export type CreateUserParams = {
    username: string;
    password: string;
}

export type SearchUserParams = {
    username: string;
    password: string;
}

export enum UserErrorCode {
    USERNAME_ALREADY_EXIST = 'Account_ERR_01',
    NOT_FOUND = 'Account_ERR_02',
    INVALID_CREDENTIALS = 'Account_ERR_03',
}

export class UserWithUserNameExistsError extends AppError {
    code: UserErrorCode;

    constructor(username: string) {
        super(`An account with the username: ${username} already exists.`);
        this.code = UserErrorCode.USERNAME_ALREADY_EXIST;
        this.httpStatusCode = 409;
    }
}

export class UserNotFoundError extends AppError {
    code: UserErrorCode;

    constructor(username: string) {
        super(`An account with this username: ${username} doesn't exists.`);
        this.code = UserErrorCode.NOT_FOUND;
        this.httpStatusCode = 404;
    }
}

export class InvalidCredentialsError extends AppError {
    code: UserErrorCode;

    constructor(username: string) {
        super(`Invalid credentials for ${username}. Please enter valid credentials.`);
        this.code = UserErrorCode.INVALID_CREDENTIALS;
        this.httpStatusCode = 401;
    }
}