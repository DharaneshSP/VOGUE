import Razorpay from "razorpay";

const key_id = process.env.RAZOR_PAY_KEY_ID as string;
const key_secret = process.env.RAZOR_PAY_KEY_SECRET as string;

export const instance = new Razorpay({
  key_id: key_id,
  key_secret: key_secret,
});
