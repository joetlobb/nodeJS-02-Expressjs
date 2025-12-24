import type { Document } from "mongoose";
import type { IUser } from "../user.ts";
import "express-session";

declare global {
  namespace Express {
    // Merge the data interface with Mongoose's Document type
    interface Request {
      user?: (Document & IUser) | null;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    isLoggedin: boolean;
    // You usually want to store the user ID or the user object here too
    user: String;
  }
}

export {};
