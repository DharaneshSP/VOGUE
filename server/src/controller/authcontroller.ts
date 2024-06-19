import pool from "../utils/pgclient.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import { mailTransporter } from "../utils/mailClient.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const Register = async (req: Request, res: Response) => {
  const { email, name, password, otp, user,address,mobile_no } = req.body;
  let hashedpassword = await bcrypt.hash(password, 10);
  const id = uuid();

  console.log(email, name, password, otp, user, req.body);

  if (otp != user.otp) {
    return res.status(400).json({ msg: "wrong otp" });
  }
  else{
     const newUser = await pool.query(
      "INSERT INTO users (id,email,name,password,address,mobile_no) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
       [id, email, name, hashedpassword,address,mobile_no]
     );

  return res.json({ done: "Account Registered Successfully" });
  }
  
  

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

    const accessToken = jwt.sign(data, ACCESS_TOKEN_SECRET, {
      expiresIn: "30hrs",
    });

    return res.status(200).json({ auth: true, accessToken: accessToken, data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error.." });
  }
};

export const verifyandSendOTP = async (req: Request, res: Response) => {
  const { email } = req.query;
  console.log(email);
  const user = await pool.query(
    "SELECT EXISTS (SELECT * FROM users WHERE email= $1)",
    [email],
  );

  const userExist = user.rows[0].exists;
  if (userExist) {
    return res
      .status(400)
      .json({ done: false, msg: "email id already exists" });
  }

  const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;


  const result = await mailTransporter.sendMail({
    from: {
      name: "VOGUE",
      address: `devtest8055@gmail.com`,
    },
    to: ["dharaneshsp28@gmail.com"],
     subject: "Your VOGUE Registration OTP",
      html: `<!DOCTYPE html>
              <html>
              <head>
                <style>
                  .email-container {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                  }
                  .header {
                    text-align: center;
                    background-color: #f8f8f8;
                    padding: 20px;
                  }
                  .body {
                    padding: 20px;
                  }
                  .footer {
                    text-align: center;
                    background-color: #f8f8f8;
                    padding: 10px;
                  }
                  .highlight {
                    color: #007bff;
                  }
                  .otp {
                    display: block;
                    text-align: center;
                    font-size: 24px;
                    margin: 20px 0;
                    font-weight: bold;
                    color: #007bff;
                  }
                </style>
              </head>
              <body>
                <div class="email-container">
                  <div class="header">
                    <h1>Welcome to VOGUE!</h1>
                  </div>
                  <div class="body">
                    <p>Dear Valued Customer,</p>
                    <p>Thank you for choosing VOGUE. To complete your registration, please use the following One-Time Password (OTP):</p>
                    <div class="otp">${otp}</div>
                    <p>Please enter this OTP in the registration form to verify your account. This OTP is valid for the next 10 minutes.</p>
                    <p>If you did not initiate this registration, please disregard this email.</p>
                    <p>If you have any questions or need further assistance, please do not hesitate to contact our customer support team.</p>
                    <p>Thank you for choosing VOGUE. We look forward to serving you!</p>
                    <p>Best regards,</p>
                    <p><strong>The VOGUE Team</strong></p>
                  </div>
                  <div class="footer">
                    <p>&copy; 2024 VOGUE. All rights reserved.</p>
                  </div>
                </div>
              </body>
              </html>`

  });

  const token = jwt.sign({ otp }, ACCESS_TOKEN_SECRET, {
    expiresIn: "32s",
  });

  res.json({ valid: !userExist, token: token });
};

// REDIS
/*
import Redis from "redis";

const redis = Redis.createClient();

redis.on("error", (err) => {
  console.log("Redis error:");
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

*/
