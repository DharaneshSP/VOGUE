import express from "express";
import { AuthenticateJWT } from "../middleware/Authenticate.js";
import {
  Register,
  Login,
  EmitVerification,
} from "../controller/authcontroller.js";

const router = express.Router();

router.post("/register", Register);
router.get("/verifyUser", AuthenticateJWT, EmitVerification);
router.get("/login", Login);

export default router;
