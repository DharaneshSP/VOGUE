import pool from "../utils/pgclient.js";
import { Response, Request } from "express";
import { v4 as uuid } from "uuid";

export const uploadProduct = async (req: Request, res: Response) => {
  const {id,tags,img_url,category, name, description, price, user } = req.body;

  const user_id = user.user_id;

  console.log(req.body);

  try {

    const seller=await pool.query("SELECT id FROM sellers WHERE user_id=$1",[user_id]);
    const seller_id=seller.rows[0].id;

    const product = await pool.query(
      "INSERT INTO products (id,name,description,price,seller_id,category,tags,img_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [id, name, description, price, seller_id,category,tags,img_url]
    );

    return res.json(product.rows);
  } catch (err) {
    return res.json(err);
  }
};

export const getProducts = async (req: Request, res: Response) => {

  const {user}=req.body;
  const user_id=user.user_id;
  console.log(user_id)
  const products = await pool.query("select products.id , products.name ,description,price,seller_id,category,tags,img_url from products join sellers on products.seller_id=sellers.id WHERE sellers.user_id!=$1",[user_id]);
  console.log(products.rows);
  res.json(products.rows);
};


export const getProductDetails=async(req:Request,res:Response)=>{

    try{
    const id=req.query.id;

    const product=await pool.query("SELECT products.name,products.description,products.price,products.category,products.img_url,users.name AS seller_name  FROM products JOIN sellers ON sellers.id=products.seller_id JOIN users ON users.id=sellers.user_id WHERE products.id=$1",[id]);
    if(product.rows.length==0) throw new Error("Product Not Found");

    return res.json({data:product.rows});
    }
    catch(err){
      return res.status(400).json({err:err})
    }
  
}

export const deleteProduct=async(req:Request,res:Response)=>{

  const id=req.query.id;

  await pool.query("DELETE FROM products WHERE id=$1",[id]);

  return res.json({done:true});

}
