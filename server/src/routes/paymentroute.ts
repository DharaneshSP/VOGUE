import express from "express";
import { makeOrder, verifypayment } from "../controller/paymentcontroller.js";

const router = express.Router();

router.route("/makeorder").post(makeOrder);
router.route("/verifyPayment").post(verifypayment);

export default router;
