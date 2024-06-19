import express from "express";
import {payout, verifypayment } from "../controller/paymentcontroller.js";
import { AuthenticateJWT } from "../middleware/Authenticate.js";

const router = express.Router();

router.route("/verifyPayment").post(verifypayment);
router.route("/payout").post(AuthenticateJWT,payout)

export default router;
