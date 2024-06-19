import pool from "../utils/pgclient.js";
import { Response, Request } from "express";
import { v4 as uuid } from "uuid";

export const addToCart = async (req: Request, res: Response) => {
  const { user, product_id } = req.body;

  const id = user.user_id;

  const cartId = uuid();
  const count = 1;

  const cartRecord = await pool.query(
    " INSERT INTO cart (id, user_id, product_id,count) VALUES ($1, $2,$3,$4) ON CONFLICT (user_id, product_id) DO NOTHING RETURNING * ",
    [cartId, id, product_id, count]
  );


  res.json({ done: 1, data: cartRecord.rows });
};

export const getCart = async (req: Request, res: Response) => {
  const { user } = req.body;
  const id = user.user_id;

  const cartProducts = await pool.query(
    "select * from products join cart on products.id = cart.product_id where cart.user_id = $1",
    [id]
  );

  return res.json({data:cartProducts});

};

export const setQuantity=async(req:Request,res:Response)=>{

  const {id,count}=req.body;

  console.log(id,req.body);
 
  const result=await pool.query("UPDATE cart SET count=$1 WHERE id=$2",[count,id]);
 
  return res.json({done:"done"});

}

export const deleteCartItem=async(req:Request,res:Response)=>{

  const id=req.query.id;

  await pool.query("DELETE from cart WHERE id=$1",[id]);

  return res.json({done:"done"});

}
