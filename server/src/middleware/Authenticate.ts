import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const AuthenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];

  if (!token) res.status(401).send("Need token");
  else {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
      if (err) {
        res
          .status(404)
          .send({ auth: false, message: "Failed to authenticate" });
      } else {
      
        req.body.user = decoded;
        req.body.auth = true;

        next();
      }
    });
  }
};
