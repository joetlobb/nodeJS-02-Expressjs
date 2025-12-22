import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const dbUrl = process.env.DB_URL;

let _db: Db;

export const mongoConnect = (callback: () => void) => {
  if (dbUrl) {
    MongoClient.connect(dbUrl)
      .then((client) => {
        console.log("Connected!");
        _db = client.db();
        callback();
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
};

export const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};
