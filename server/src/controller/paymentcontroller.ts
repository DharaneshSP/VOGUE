import { Request, Response, query } from "express";
import { instance } from "../utils/razorClient.js";
import { v4 as uuid } from "uuid";
import crypto from "crypto";
import pool from '../utils/pgclient.js';
import {mailTransporter} from '../utils/mailClient.js'
import qr from 'qrcode'


const RAZOR_PAY_SECRET_kEY = process.env.RAZOR_PAY_KEY_SECRET as string;

export const verifypayment = async (req: Request, res: Response) => {
  const order_id = req.query.order_id;

  const order=await pool.query("SELECT * FROM orders WHERE id=$1",[order_id]);

  const { razorpay_payment_id, razorpay_signature } = req.body;

  const user_id=order.rows[0].user_id;
  const items=order.rows[0].items;

  const user=await pool.query("SELECT * FROM users WHERE id=$1",[user_id]);

  const user_emailid=user.rows[0].email;

  const  generated_signature = crypto
    .createHmac("sha256", RAZOR_PAY_SECRET_kEY)
    .update(order_id + "|" + razorpay_payment_id)
    .digest("hex");
  if (generated_signature == razorpay_signature) {

     const result=await pool.query("UPDATE orders SET paymentDone=$1,payment_id=$2 WHERE id=$3",[true,razorpay_payment_id,order_id]);

     let qrcontent={    
      order_id:order_id,
    }
    
  const qrCode=await qr.toDataURL(JSON.stringify(qrcontent));
  const base64Data: string = qrCode.replace(/^data:image\/png;base64,/, '');

  const buffer: Buffer = Buffer.from(base64Data, 'base64');
  
  await mailTransporter.sendMail({
    from: {
      name: "VOGUE",
      address: `devtest8055@gmail.com`,
    },
    to: ["dharaneshsp28@gmail.com"],
    subject: "Thanks For Purchasing : Your Purchase Confirmation and Delivery Information",
    html: `<!DOCTYPE html>
              <html>
              <head>
                <style>
                  .email-container {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                  }
                  .header {
                    text-align: center;
                    background-color: #f8f8f8;
                    padding: 20px;
                  }
                  .body {
                    padding: 20px;
                  }
                  .footer {
                    text-align: center;
                    background-color: #f8f8f8;
                    padding: 10px;
                  }
                  .highlight {
                    color: #007bff;
                  }
                  .qr-code {
                    display: block;
                    margin: 20px auto;
                  }
                </style>
              </head>
              <body>
                <div class="email-container">
                  <div class="header">
                    <h1>Thank You for Your Purchase!</h1>
                  </div>
                  <div class="body">
                    <p>Dear Valued Customer,</p>
                    <p>We are glad to confirm your recent purchase with us. Your order is being processed and will be delivered within the next <span class="highlight">3 days</span>.</p>
                    <p>To ensure the security of your package, we have provided a unique QR code below. Please use this QR code to verify your order upon delivery:</p>
                    <img src="cid:qrcode.png" alt="QR Code" class="qr-code" height="150" width="150" />
                <p>Simply present this QR code to the delivery agent to confirm and receive your package. This step helps us verify that the right package is delivered to the right recipient.</p>
                    <p>If you have any questions or need further assistance, please do not hesitate to contact our customer support team.</p>
                    <p>Thank you for shopping with us. We hope you enjoy your purchase!</p>
                    <p>Best regards,</p>
                    <p><strong>The VOGUE Team</strong></p>
                  </div>
                  <div class="footer">
                    <p>&copy; 2024 VOGUE. All rights reserved.</p>
                  </div>
                </div>
              </body>
              </html>`,
      attachments: [{
        filename: 'qrcode.png',
        content: buffer,
        cid: 'qrcode.png' 
      },
      {
        filename:'qrCode.png',
        content:buffer
      }]
  });
   
      
 
    console.log(items); 

    await sendEmails(items);
     
    return res.redirect(`http://localhost:6969/paymentinfo?success=${true}&payment_id=${razorpay_payment_id}`);
  }
  
    return res.redirect(`http://localhost:6969/paymentinfo?success=${false}&payment_id=${razorpay_payment_id}`);
     
 };


const sendEmails = async (items:any) => {
  try {


    const productIds = Object.keys(items);

    const result = await pool.query(`
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.seller_id,
        s.user_id,
        u.email AS seller_email
      FROM
        products p
      JOIN
        sellers s ON p.seller_id = s.id
      JOIN
        users u ON s.user_id = u.id
      WHERE
        p.id = ANY($1)
    `, [productIds]);

    const sellerProducts = result.rows.reduce((acc, row) => {
      if (!acc[row.seller_email]) {
        acc[row.seller_email] = [];
      }
      acc[row.seller_email].push({
        product_id: row.product_id,
        product_name: row.product_name,
        quantity: items[row.product_id],
      });
      return acc;
    }, {});
   

    for (const [sellerEmail, products] of Object.entries(sellerProducts as Record<string, any[]>)) {
      const productRows = products.map(
        (product) => `
          <tr>
            <td>${product.product_id}</td>
            <td>${product.product_name}</td>
            <td>${product.quantity}</td>
          </tr>
        `
      ).join('');

      const mailOptions = {
        from: {
           name: "VOGUE",
          address: `devtest8055@gmail.com`,

        },
        to: "dharaneshsp28@gmail.com",
        subject: 'New Order Notification - Ship within 24 hours',
        html: `
          <p>Dear Seller,</p>
          <p>You have received a new order for the following products. Please ensure to ship the products within the next 24 hours in your nearest VOGUE distribution center.</p>
          <table border="1" cellspacing="0" cellpadding="5">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
            </tbody>
          </table>
          <p>Thank you,</p>
          <p>VOGUE</p>
        `,
      };

      await mailTransporter.sendMail(mailOptions);
    }

    console.log('Emails sent successfully.');
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};    
