import { Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { UserModel } from '../models/User';
import { User } from '../../../common/User';

dotenv.config();

const url = process.env.DB_URL || 'localhost';
const name = process.env.DB_NAME || 'test';

let db: Db;

export async function connect() {
    const client = await MongoClient.connect(url);
    db = client.db(name);
    console.log('Connected to DB');
}

export function getDB() {
    return db;
}


export async function getUserById({ id } : { id: string | null }): Promise<User | null> {
    return UserModel.findOne({ id }).exec();
}
