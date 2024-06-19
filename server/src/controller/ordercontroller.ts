import { Request, Response, query } from "express";
import { instance } from "../utils/razorClient.js";
import { v4 as uuid } from "uuid";
import pool from "../utils/pgclient.js";
import {mailTransporter} from '../utils/mailClient.js'
import puppeteer from 'puppeteer'

export const makeOrder = async (req: Request, res: Response) => {
  const { items, user } = req.body;

  console.log(items, user);
  const receipt_id = uuid();
  const user_id = user.user_id;
  let amount: number = 0;

  try {

    const orderData:any={};

    const pricePromise = items.map(async (item:any) => {
     
      const cartData = await pool.query("SELECT count,product_id FROM cart WHERE id=$1",[item.id]);
      
      let product_id=cartData.rows[0].product_id;
      const product = await pool.query(
        "SELECT price FROM products WHERE id=$1",
        [product_id],
      );
      
      const count =cartData.rows[0].count;
      const price = product.rows[0].price;

      orderData[product_id]=count;
      
      return price * count;
    });

    const prices = await Promise.all(pricePromise);
    amount = prices.reduce((total, price) => total + price, 0);

    
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: receipt_id,
    };

    const order = await instance.orders.create(options);
    const order_id = order.id;
    console.log(typeof amount);
    
    const result = await pool.query(
      "INSERT INTO orders (id,user_id,total_cost,items,receipt_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [order_id, user_id, amount, orderData, receipt_id]
    );

     return res.status(200).json({ order: result.rows[0] });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "failed to create order" });
  }
};



export const validateOrder = async (req: Request, res: Response) => {
  const { order_id } = req.body;

  try{
  const order = await pool.query("SELECT * FROM orders WHERE id=$1 AND delivered=false", [
    order_id,
  ]);


   if(!order.rows[0]){
        throw new Error("Order Not Found")
     } 


  const user=await pool.query("SELECT * FROM users WHERE id=$1",[order.rows[0].user_id])
  
  let name=user.rows[0].name;
  let email=user.rows[0].email;

  const items = order.rows[0].items;

  const productIds = Object.keys(items);

  const productQueries = productIds.map(productId =>
    pool.query("SELECT id, name, price FROM products WHERE id=$1", [productId])
  );

  const productsResults = await Promise.all(productQueries);

  const products = productsResults.map(result => result.rows[0]);

  const detailedProducts = products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity_ordered: items[product.id],
    total_cost: product.price * items[product.id]
  }));


  generateInvoiceBuffer(order.rows[0], name, detailedProducts)
  .then(pdfBuffer => {
    
    
    mailTransporter.sendMail({
      from: {
        name: 'VOGUE',
        address: 'devtest8055@gmail.com',
      },
      to: ["dharaneshsp28@gmail.com"], // email
      subject: 'Invoice from VOGUE',
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for shopping with us! We appreciate your business.</p>
        <p>Please find your invoice attached.</p>
        <p>Best regards,</p>
        <p>VOGUE Team</p>
      `,
      attachments: [
        {
          filename: 'Invoice.pdf',
          content: pdfBuffer, 
          encoding: 'base64'
        }
      ]
    })
    .then(()=>console.log("Sent"))
    .catch(()=>console.log("Error at sending invoice"))
  
  })
  .catch(error => {
    console.error('Error generating invoice:', error);
  });
    
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
    }


    await pool.query(
      "UPDATE orders SET delivered=true,delivered_at=CURRENT_TIMESTAMP WHERE id=$1",
      [order_id],
    );

    return res.status(200).json({done:true})
  } catch (err) {
    return res.status(400).json({err:err})
  }

};

export const getOrderedItems=async(req:Request,res:Response)=>{


    const order_id=req.query.order_id;
    
    console.log(order_id);
    const result=await pool.query("SELECT items,total_cost FROM orders WHERE id=$1",[order_id]);

    const items=result.rows[0].items;
    const total_cost=result.rows[0].total_cost;

    let data:any=[]

   const segregate= Object.keys(items).map(async(id)=>{
        const res=await pool.query("SELECT name,price FROM products WHERE id=$1",[id]);
        let name=res.rows[0].name;
        let price=res.rows[0].price;
        data.push({id:id,name:name,price:price,count:items[id]});
        return true;
    })
       await Promise.all(segregate);

    return res.json({items:data,total_cost:total_cost});

}

export const getOrdersTotalPrice=async(req:Request,res:Response)=>{

    const id=req.query.id;
    
    const order=await pool.query("SELECT total_cost FROM orders WHERE id=$1",[id]);

  
    return res.json({total_cost:order.rows[0].total_cost})

}

export const getOrders=async(req:Request,res:Response)=>{
  
    const {user}=req.body;

    const orders=await pool.query("SELECT * FROM orders WHERE user_id=$1",[user.user_id]);

    res.json({data:orders.rows,user:user});

}


const generateInvoiceHTML = (order:any, customerName:string, detailedProducts:any) => {
  const today = new Date().toLocaleDateString();
  const totalCost = detailedProducts.reduce((total:any, product:any) => total + (parseFloat(product.price) * product.quantity_ordered), 0);
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .container {
          width: 80%;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          text-align: center;
          font-size: 24px;
        }
        .details {
          margin-bottom: 20px;
        }
        .details span {
          display: block;
          margin-bottom: 5px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        table, th, td {
          border: 1px solid #ddd;
        }
        th, td {
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        .total {
          text-align: right;
          font-size: 18px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Invoice</h1>
        <div class="details">
          <span>Order ID: ${order.id}</span>
          <span>Customer: ${customerName}</span>
          <span>Date: ${today}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            ${detailedProducts.map((product:any) => `
              <tr>
                <td>${product.name}</td>
                <td>₹${parseFloat(product.price).toFixed(2)}</td>
                <td>${product.quantity_ordered}</td>
                <td>₹${(parseFloat(product.price) * product.quantity_ordered).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="total">Total: ₹${totalCost.toFixed(2)}</div>
      </div>
    </body>
    </html>
  `;
};

const generateInvoicePDF = async (htmlContent:any) => {
  const browser = await puppeteer.launch({
    headless: true, 
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 60000 
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();
  return pdfBuffer;
};

const generateInvoiceBuffer = async (order:any, customerName:string, detailedProducts:any) => {
  const htmlContent = generateInvoiceHTML(order, customerName, detailedProducts);
  const pdfBuffer = await generateInvoicePDF(htmlContent);
  return pdfBuffer;
};
