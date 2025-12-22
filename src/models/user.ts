import { ObjectId } from "mongodb";
import { getDb } from "../utils/database.ts";

class User {
  private name: string;
  private email: string;
  private _id?: ObjectId;

  constructor(name: string, email: string, id?: ObjectId) {
    this.name = name;
    this.email = email;
    if (id) this._id = id;
  }

  public getUserId = () => this._id;

  save() {
    const db = getDb();
    const userData = {
      name: this.name,
      email: this.email
    }
    return db.collection('users').insertOne(userData)
  }

  static findById(id: string) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(id) });
  }
}

export default User;