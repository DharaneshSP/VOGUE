import pool from "../utils/pgclient.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const Register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  let hashedpassword = await bcrypt.hash(password, 10);
  const id = uuid();

  const user = await pool.query(
    "INSERT INTO users (id,email,name,password) VALUES ($1,$2,$3,$4) RETURNING *",
    [id, email, name, hashedpassword]
  );

  res.json({ user: user.rows[0] });
};

export const EmitVerification = (req: Request, res: Response) => {
  res.json({ auth: true, message: "Authenticated", ...req.body });
};

export const Login = async (req: Request, res: Response) => {
  const email = req.query.email as string;
  const password = req.query.password as string;

  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (rows.length === 0) {
      console.log(11);
      return res.status(404).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ auth: false, message: "Invalid password" });
    }

    const data = {
      user_id: rows[0].id,
      user_name: rows[0].name,
      user_email: rows[0].email,
    };

    console.log(data);

    const accessToken = jwt.sign(data, ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });

    return res.status(200).json({ auth: true, accessToken: accessToken, data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
