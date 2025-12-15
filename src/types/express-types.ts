import { type Request, type Response, type NextFunction } from "express";

export interface IRequestHandler {
    (req: Request, res: Response, next: NextFunction): void;
}