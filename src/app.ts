import { createServer } from "http";
import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware");
  next(); // Allow the request to continue to the next middleware
});

app.use((req, res, next) => {
  console.log("In another middleware");
  res.send("<h1>Hello from Express</h1>");
});

const server = createServer(app);

server.listen(3000);
