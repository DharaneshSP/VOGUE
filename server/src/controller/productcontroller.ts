import pool from "../utils/pgclient.js";
import { Response, Request } from "express";
import { v4 as uuid } from "uuid";

export const uploadProduct = async (req: Request, res: Response) => {
  const { name, description, price, user } = req.body;

  const user_id = user.user_id;
  const id: string = uuid();

  console.log(name, description, price, user_id);

  try {

    const seller=await pool.query("SELECT id FROM sellers WHERE user_id=$1",[user_id]);
    const seller_id=seller.rows[0].id;
    const product = await pool.query(
      "INSERT INTO products (id,name,description,price,seller_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [id, name, description, price, seller_id]
    );
    return res.json(product.rows);
  } catch (err) {
    return res.json(err);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await pool.query("SELECT * FROM products");
  console.log(products);
  res.json(products.rows);
};
