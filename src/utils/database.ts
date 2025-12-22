import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DB_URL;

const mongoConnect = (callback: (client: MongoClient) => void) => {
    if (dbUrl) {
        MongoClient.connect(dbUrl)
            .then(client => {
                callback(client)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export default mongoConnect;