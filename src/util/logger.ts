import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }), // エラーのスタックトレースを追加
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level}] ${message}　${stack ? "\n" + stack : ""}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});
