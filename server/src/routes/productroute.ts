import express from "express";
import { uploadProduct, getProducts, getProductDetails,deleteProduct } from "../controller/productcontroller.js";
import { AuthenticateJWT } from "../middleware/Authenticate.js";

const router = express.Router();

router.route("/upload-product").post(AuthenticateJWT,uploadProduct);
router.route("/getProducts").get(AuthenticateJWT,getProducts);
router.route("/getProductDetails").get(AuthenticateJWT,getProductDetails);
router.route("/deleteProduct").delete(AuthenticateJWT,deleteProduct);

export default router;
