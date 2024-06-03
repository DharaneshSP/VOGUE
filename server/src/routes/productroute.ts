import express from "express";
import { uploadProduct, getProducts } from "../controller/productcontroller.js";
import { AuthenticateJWT } from "../middleware/Authenticate.js";

const router = express.Router();

//router.post("/upload-product", AuthenticateJWT, uploadProduct);
router.route("/upload-product").post(AuthenticateJWT, uploadProduct);
router.get("/getProducts", getProducts);
router.delete("/delete-product");

export default router;
