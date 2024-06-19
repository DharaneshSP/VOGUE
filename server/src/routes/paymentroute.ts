import express from "express";
import {verifypayment } from "../controller/paymentcontroller.js";

const router = express.Router();

router.route("/verifyPayment").post(verifypayment);

export default router;
