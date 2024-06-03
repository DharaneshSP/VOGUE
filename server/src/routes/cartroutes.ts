import express from "express";
import { addToCart, getCart } from "../controller/cartcontroller.js";
import { AuthenticateJWT } from "../middleware/Authenticate.js";

const router = express.Router();

router.route("/addToCart").post(AuthenticateJWT, addToCart);
router.route("/getCart").get(AuthenticateJWT, getCart);
router.delete("/deleteCart");

export default router;
