import pool from "../utils/pgclient.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import axios from "axios";

const key_id = process.env.RAZOR_PAY_KEY_ID as string;
const key_secret = process.env.RAZOR_PAY_KEY_SECRET as string;

export const createSellerByBankAccount = async (req: Request, res: Response) => {

  const { name, email, mobile_number, account_no, ifsc_code } = req.body;

  try {

    const user = await pool.query("SELECT id FROM users WHERE email=$1", [email]);

    const user_id = user.rows[0].id;

    console.log(name, ifsc_code, account_no);

    const seller_id = uuid();
    const reference_id = uuid();

    const data = {
      name: name,
      email: email,
      contact: mobile_number,
      type: "employee",
      reference_id: reference_id,
    }

    const headers = {
      "Content-Type": "application/json",
    };

    const contact = await axios.post(
      "https://api.razorpay.com/v1/contacts",
      data,
      {
        auth: {
          username: key_id,
          password: key_secret,
        },
        headers: headers,
      },
    );


    const contact_id: string = contact.data.id;


    const fund_account = await axios.post(
      "https://api.razorpay.com/v1/fund_accounts",
      {
        account_type: "bank_account",
        contact_id: contact_id,
        bank_account: {
          name: name,
          ifsc: ifsc_code,
          account_number: account_no
        }
      },
      {
        auth: {
          username: key_id,
          password: key_secret,
        },
        headers: headers,
      },
    );

    const fund_id = fund_account.data.id;


    const seller = await pool.query("INSERT INTO sellers (id,user_id,mobile_no,fund_type,fund_id,contact_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", [seller_id, user_id, mobile_number, "bank_account", fund_id, contact_id]);

    res.json({ done: seller.rows[0] });

  }
  catch (err) {
    res.status(400).json({ err: err })
  }

};


export const createSellerByVPC = async (req: Request, res: Response) => {

  const { name, mobile_number, email, upi_id } = req.body;

  try {

    const user = await pool.query("SELECT id FROM users WHERE email=$1", [email]);
    console.log(name, email, user.rows);
    const user_id = user.rows[0].id;

    const sellerexist = await pool.query("SELECT * FROM sellers WHERE user_id=$1", [user_id]);

    if (sellerexist.rows[0]) {
      console.log("done");
      return res.json({ data: sellerexist.rows[0] })
    }

    const seller_id = uuid();
    const reference_id = uuid();

    const data = {
      name: name,
      email: email,
      contact: mobile_number,
      type: "employee",
      reference_id: reference_id,
    }


    const headers = {
      "Content-Type": "application/json",
    };



    const contact = await axios.post(
      "https://api.razorpay.com/v1/contacts",
      data,
      {
        auth: {
          username: key_id,
          password: key_secret,
        },
        headers: headers,
      },
    );



    const contact_id: string = contact.data.id;



    const fund_account = await axios.post(
      "https://api.razorpay.com/v1/fund_accounts",
      {
        account_type: "vpa",
        contact_id: contact_id,
        vpa: {
          address: upi_id,
        },
      },
      {
        auth: {
          username: key_id,
          password: key_secret,
        },
        headers: headers,
      },
    );

    const fund_id = fund_account.data.id;
    const fund_type = "vpa";


    const seller = await pool.query("INSERT INTO sellers (id,user_id,mobile_no,fund_type,fund_id,contact_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", [seller_id, user_id, mobile_number, fund_type, fund_id, contact_id]);

    res.status(200).json({ data: seller.rows[0] });

  }
  catch (err) {
    res.status(400).json({ err: err })
  }

};


export const getSellerDetails = async (req: Request, res: Response) => {

  const { user } = req.body;

  let user_id = user.user_id;

  const seller = await pool.query("SELECT * FROM sellers WHERE user_id=$1", [user_id]);


  if (seller.rows.length == 0) {
    return res.status(400).json({ msg: "Not an Seller" });
  }
  else {
    let seller_id = seller.rows[0].id;

    const products = await pool.query("SELECT * FROM products WHERE seller_id=$1", [seller_id]);

    return res.status(200).json({ seller: { ...seller.rows[0], name: user.user_name }, products: products.rows });
  }

}
