import express from "express";
import { AuthenticateJWT } from "../middleware/Authenticate.js";
import {
  Register,
  Login,
  EmitVerification,
  verifyandSendOTP
} from "../controller/authcontroller.js";


//import { Register1,  verifyandSendOTP1} from "../controller/authcontroller.js";



const router = express.Router();

console.log("called..");
router.get("/initializeautentication", verifyandSendOTP);
router.route("/verifyandregister").post(AuthenticateJWT, Register);
router.get("/verifyUser", AuthenticateJWT, EmitVerification);
router.get("/login", Login);



// REDIS
/*
router.get("/initializeautentication1", verifyandSendOTP1);
router.route("/verifyandregister1").post(Register1);
*/
export default router;
