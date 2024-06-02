import { Errback, NextFunction, Request, Response } from "express";

function errorHandler(
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return res.status(500).json({
    message: "Something Wrong with the server",
    error: err,
  });
}

export default errorHandler;
