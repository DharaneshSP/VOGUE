import pool from "../utils/pgclient.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import { mailTransporter } from "../utils/mailClient.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const Register = async (req: Request, res: Response) => {
  const { email, name, password, otp, user } = req.body;
  let hashedpassword = await bcrypt.hash(password, 10);
  const id = uuid();

  console.log(email, name, password, otp, user, req.body);

  if (otp != user.otp) {
    return res.status(400).json({ msg: "wrong otp" });
  }

  //   const newUser = await pool.query(
  //     "INSERT INTO users (id,email,name,password) VALUES ($1,$2,$3,$4) RETURNING *",
  //     [id, email, name, hashedpassword]
  //   );

  return res.json({ done: "Account Registered Successfully" });
  //res.json({ user: newUser.rows[0] });
  //res.json({ 1: 1 });
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

export const verifyandSendOTP = async (req: Request, res: Response) => {
  const { email } = req.query;
  console.log(email);
  const user = await pool.query(
    "SELECT EXISTS (SELECT * FROM users WHERE email= $1)",
    [email]
  );

  const userExist = user.rows[0].exists;
  if (userExist) {
    return res
      .status(400)
      .json({ done: false, msg: "email id already exists" });
  }

  const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  console.log("otp = ", otp);

  const result = await mailTransporter.sendMail({
    from: {
      name: "devtest",
      address: `devtest8055@gmail.com`,
    },
    to: ["dharaneshsp28@gmail.com"],
    subject: "otp",
    html: `<b>Hi, your otp is ${otp}`,
  });

  const token = jwt.sign({ otp }, ACCESS_TOKEN_SECRET, {
    expiresIn: "32s",
  });

  res.json({ valid: !userExist, token: token });
};

// REDIS

import Redis from "redis";

const redis = Redis.createClient();

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.connect();

export const verifyandSendOTP1 = async (req: Request, res: Response) => {
  const { email } = req.query;
  console.log(email);
  const user = await pool.query(
    "SELECT EXISTS (SELECT * FROM users WHERE email= $1)",
    [email]
  );

  const userExist = user.rows[0].exists;
  if (userExist) {
    return res
      .status(400)
      .json({ done: false, msg: "email id already exists " });
  }

  const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  console.log("otp = ", otp);

  const result = await mailTransporter.sendMail({
    from: {
      name: "devtest",
      address: `devtest8055@gmail.com`,
    },
    to: ["dharaneshsp28@gmail.com"],
    subject: "otp",
    html: `<b>Hi, your otp is ${otp}`,
  });

  await redis.setEx(String(email), 30, String(otp));

  res.json({ valid: !userExist });
};

export const Register1 = async (req: Request, res: Response) => {
  const { email, name, password, otp } = req.body;
  let hashedpassword = await bcrypt.hash(password, 10);
  const id = uuid();

  const originalOtp = await redis.get(email);

  console.log(email, name, password, otp, originalOtp);

  if (otp != originalOtp) {
    return res.status(400).json({ msg: "wrong otp" });
  }

  const newUser = await pool.query(
    "INSERT INTO users (id,email,name,password) VALUES ($1,$2,$3,$4) RETURNING *",
    [id, email, name, hashedpassword]
  );

  return res.json({ done: "Account Registered Successfully" });
  //res.json({ user: newUser.rows[0] });
  //res.json({ 1: 1 });
};
