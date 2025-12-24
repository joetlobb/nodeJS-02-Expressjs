import type { Document } from "mongoose";
import type { IUser } from "../user.ts";

declare global {
  namespace Express {
    // Merge the data interface with Mongoose's Document type
    interface Request {
      user?: (Document & IUser) | null;
    }
  }
}
