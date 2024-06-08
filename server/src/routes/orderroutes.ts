import express from 'express';
import { AuthenticateJWT } from '../middleware/Authenticate.js';
import {makeOrder, validateOrder} from '../controller/ordercontroller.js'

const router = express.Router();

router.post("/makeOrder",AuthenticateJWT,makeOrder);
router.post("/validateOrder",AuthenticateJWT,validateOrder);

export default router;
