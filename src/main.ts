import { add } from "./sub.js";
import http from "http";
import express, { Express, Request, Response } from "express";
import { getRequest, postRequest } from "./call-api.js";
import { logger } from "./util/logger.js";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  const greeting: string = "Hello, TypeScript!";
  logger.info(greeting);

  const sum: number = add(5, 10);
  logger.info(`5 + 10 = ${sum}`);

  const message: string = `${greeting} result: ${sum}.`;

  getRequest();
  postRequest();

  return res.send(message);
});

const server: http.Server = http.createServer(app);
server.listen(3000, () => {
  logger.info("Server is listening on port 3000");
});
