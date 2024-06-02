import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const AuthenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authheader = req.headers["authorization"];
  console.log(authheader);
  const token = authheader && authheader.split(" ")[1];

  if (!token) res.send("Need token");
  else {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
      if (err) {
        res.send({ auth: false, message: "Failed to authenticate" });
      } else {
        req.body.user = decoded;
        next();
      }
    });
  }
};
