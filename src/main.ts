import { add } from "./sub.js";
import http from "http";
import express, { Express, Request, Response } from "express";
import { getRequest, postRequest } from "./call-api.js";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  const greeting: string = "Hello, TypeScript!";
  console.log(greeting);

  const sum: number = add(5, 10);
  console.log(`5 + 10 = ${sum}`);

  const message: string = `${greeting} result: ${sum}.`;

  getRequest();
  postRequest();

  return res.send(message);
});

const server: http.Server = http.createServer(app);
server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
