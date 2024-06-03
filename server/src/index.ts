import express, { Request, Response } from "express";
import errorHandler from "./middleware/ErrorHandler.js";
import { corsOptions, PORT } from "./utils/config.js";
import cors from "cors";
import "./utils/pgclient.js";
import authroutes from "./routes/authroute.js";
import productroutes from "./routes/productroute.js";
import cartroutes from "./routes/cartroutes.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", authroutes);
app.use("/api/product", productroutes);
app.use("/api/cart", cartroutes);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World..");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
