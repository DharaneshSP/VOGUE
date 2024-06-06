import { Request, Response, query } from "express";
import { instance } from "../utils/razorClient.js";
import { v4 as uuid } from "uuid";
import crypto from "crypto";

export const makeOrder = async (req: Request, res: Response) => {
   
  const receipt_id = uuid();
  const amount = 1.5;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: receipt_id,
  };

  console.log("called.......");

  try {
    const order = await instance.orders.create(options);
    console.log(order);
    return res.status(200).json({ order: order });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "failed to create order" });
  }
};

const RAZOR_PAY_SECRET_kEY = process.env.RAZOR_PAY_KEY_SECRET as string;

export const verifypayment = async (req: Request, res: Response) => {
  const order_id = req.query.order_id;

  const { razorpay_payment_id, razorpay_signature } = req.body;

  console.log("a = ",req.body, order_id,razorpay_payment_id,razorpay_signature);
  console.log(RAZOR_PAY_SECRET_kEY);
  const generated_signature = crypto
    .createHmac("sha256", RAZOR_PAY_SECRET_kEY)
    .update(order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature == razorpay_signature) {
    console.log("payment is successful..");

    return res.redirect(`http://localhost:6969/paymentinfo?success=${true}&payment_id=${razorpay_payment_id}`);
  }
  
    return res.redirect(`http://localhost:6969/paymentinfo?success=${false}&payment_id=${razorpay_payment_id}`);


 };
