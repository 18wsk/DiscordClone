import { Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';

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
