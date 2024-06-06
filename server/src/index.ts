import express, { Request, Response } from "express";
import errorHandler from "./middleware/ErrorHandler.js";
import { corsOptions, PORT } from "./utils/config.js";
import cors from "cors";
import "./utils/pgclient.js";
import authroutes from "./routes/authroute.js";
import productroutes from "./routes/productroute.js";
import cartroutes from "./routes/cartroutes.js";
import paymentroute from "./routes/paymentroute.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", authroutes);
app.use("/api/product", productroutes);
app.use("/api/cart", cartroutes);
app.use("/api/payment", paymentroute);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World...dsp11");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port.. ${PORT}`);
});
