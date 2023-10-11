import { Schema, Types } from 'mongoose';

export interface UserDB {
    _id: Types.ObjectId;
    name: string;
    username: string;
    hashedPassword: string;
};

export const userDBSchema: Schema = new Schema<UserDB>(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        hashedPassword: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
);