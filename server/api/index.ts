import express, { Request, Response } from "express";
import errorHandler from "../src/middleware/ErrorHandler";
import { corsOptions, PORT } from "../src/utils/config.js";
import cors from "cors";
import "../src/utils/pgclient.js";

import authroutes from "../src/routes/authroute.js";
import productroutes from "../src/routes/productroute.js";
import cartroutes from "../src/routes/cartroutes.js";
import paymentroute from "../src/routes/paymentroute.js";
import sellerroute from '../src/routes/sellerroutes.js'
import orderroutes from '../src/routes/orderroutes.js';

const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", authroutes);
app.use("/api/product", productroutes);
app.use("/api/cart", cartroutes);
app.use("/api/payment", paymentroute);
app.use("/api/seller",sellerroute);
app.use("/api/order",orderroutes);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port... ${PORT}`);
});

module.exports = app;
