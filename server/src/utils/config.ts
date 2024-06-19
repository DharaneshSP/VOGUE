import dotenv from "dotenv";
import { CorsOptions } from "cors";

dotenv.config();

const PORT = process.env.PORT || 8000;
const FRONTEND=process.env.FRONTEND as string;

const allowedOrigins = [
   FRONTEND,
  "http://127.0.0.1:3000",
  "http://127.0.0.1:8000",
  "http://127.0.0.1:6969",
  "http://localhost:3000",
  "http://localhost:8000",
  "http://localhost:6969",
];

const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (!requestOrigin || allowedOrigins.indexOf(requestOrigin) !== -1) {
      callback(null, requestOrigin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }, 
  optionsSuccessStatus: 200,
};

export { corsOptions, PORT };
