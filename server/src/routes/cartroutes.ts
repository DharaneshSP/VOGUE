import express from "express";
import { addToCart, getCart,setQuantity,deleteCartItem } from "../controller/cartcontroller.js";
import { AuthenticateJWT } from "../middleware/Authenticate.js";

const router = express.Router();

router.route("/addToCart").post(AuthenticateJWT, addToCart);
router.route("/getCart").get(AuthenticateJWT, getCart);
router.route("/changeQuantity").put(AuthenticateJWT,setQuantity)
router.route("/deleteCartItem").delete(AuthenticateJWT,deleteCartItem);

export default router;
