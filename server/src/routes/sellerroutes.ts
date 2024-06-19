import express from 'express';
import { createSellerByBankAccount, createSellerByVPC, getSellerDetails } from '../controller/sellercontroller.js';
import { AuthenticateJWT } from '../middleware/Authenticate.js';

const router =  express.Router();


router.route("/createSellerbyvpc").post(createSellerByVPC);
router.route("/createSellerbyBankaccount").post(createSellerByBankAccount);
router.route("/getSellerDetails").get(AuthenticateJWT,getSellerDetails);
//router.route("/geta").get(AuthenticateJWT, getSellerDetails);
export default router;
