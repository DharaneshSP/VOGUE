import { Request, Response, query } from "express";
import { instance } from "../utils/razorClient.js";
import { v4 as uuid } from "uuid";
import pool from "../utils/pgclient.js";

export const makeOrder = async (req: Request, res: Response) => {
  const { items, user } = req.body;

  console.log(items, user);
  const receipt_id = uuid();
  const user_id = user.user_id;
  let amount: number = 0;

  try {
    const pricePromise = Object.keys(items).map(async (product_id) => {
      console.log(product_id);
      const count = items[product_id];
      const product = await pool.query(
        "SELECT price FROM products WHERE id=$1",
        [product_id],
      );
      const price = product.rows[0].price;
      return price * count;
    });

    const prices = await Promise.all(pricePromise);
    amount = prices.reduce((total, price) => total + price, 0);

    console.log(amount);

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: receipt_id,
    };

    console.log("called.......");

    //try {
    const order = await instance.orders.create(options);
    const order_id = order.id;
    console.log(typeof amount);

    //done();
    //console.log("a= ",[order_id, user_id, amount, items, receipt_id]);
    const result = await pool.query(
      "INSERT INTO orders (id,user_id,total_cost,items,receipt_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [order_id, user_id, amount, items, receipt_id],
    );
    //console.log(result.rows);
    //console.log(order);
    return res.status(200).json({ order: result.rows[0] });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "failed to create order" });
  }
};

export const validateOrder = async (req: Request, res: Response) => {
  const { order_id } = req.body;

  /* validating based on certain constraints */

  const order = await pool.query("SELECT items FROM orders WHERE id=$1", [
    order_id,
  ]);

  const items = order.rows[0].items;
  console.log(items);

  try {
    let v = 0;
    for (const key of Object.keys(items)) {
      const product = await pool.query(
        "SELECT seller_id,price FROM products WHERE id=$1",
        [key],
      );
      let price = product.rows[0].price * items[key];
      let seller_id = product.rows[0].seller_id;
      console.log(key, price, seller_id);
      await pool.query(
        "UPDATE sellers SET wallet = wallet + $1 WHERE id=$2",
        [price, seller_id],
      );
      v = v + price;
      console.log(price);
    }

    console.log(" v ", v);

    await pool.query(
      "UPDATE orders SET delivered=true,delivered_at=CURRENT_TIMESTAMP WHERE id=$2",
      [order_id],
    );
  } catch (err) {
    console.log(err);
  }

  return res.json({ 1: items });
};
