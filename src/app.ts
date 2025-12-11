import { createServer } from "http";
import express from "express";

const app = express();

const server = createServer(app);

server.listen(3000);
