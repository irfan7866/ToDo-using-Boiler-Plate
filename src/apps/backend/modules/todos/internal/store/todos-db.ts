import { Schema, Types } from 'mongoose';

export interface TodosDB {
    _id: Types.ObjectId;
    account: Types.ObjectId;
    description: string;
    isComplete: boolean;
}

export const todosDbSchema: Schema = new Schema<TodosDB> (
    {
        account: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
            index: true,
        },
        isComplete: {
            type: Boolean,
            default: false,
        },
    }, 
    {
        collection: 'Todos',
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
);