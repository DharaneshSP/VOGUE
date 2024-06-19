import express from 'express';
import { AuthenticateJWT } from '../middleware/Authenticate.js';
import {getOrderedItems, getOrders, getOrdersTotalPrice, makeOrder, validateOrder} from '../controller/ordercontroller.js'

const router = express.Router();

router.route("/makeOrder").post(AuthenticateJWT,makeOrder);
router.route("/validateOrder").post(validateOrder);
router.route("/getOrderedItems").get(AuthenticateJWT,getOrderedItems)
router.route("/getOrdersTotalPrice").get(AuthenticateJWT,getOrdersTotalPrice);
router.route("/getOrders").get(AuthenticateJWT,getOrders);
export default router;
