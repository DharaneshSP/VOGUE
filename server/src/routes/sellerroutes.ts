import express from 'express';
import { createSellerByBankAccount, createSellerByVPC } from '../controller/sellercontroller.js';
import { AuthenticateJWT } from '../middleware/Authenticate.js';

const router =  express.Router();


router.route("/createSellerbyvpc").post(createSellerByVPC);
router.route("/createSellerbyBankaccount").post(createSellerByBankAccount);

export default router;
