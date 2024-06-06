"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

interface cartProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  seller_id: string;
  image_url: string;
  user_id: string;
  product_id: string;
  count: string;
}

const page = () => {
  const [cartProducts, setcartProducts] = useState<cartProduct[]>([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("http://localhost:8000/api/cart/getCart", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setcartProducts(res.data.data))
      .catch((e) => console.log(e));
  }, []);

  const handlepayment = (e: any) => {
    e.preventDefault();

    console.log(window);

    const order_id="order_OJa5dmI3ghv4mN";

    const options = {
      key: "rzp_test_BId9XKXtg6oGMG", // Enter the Key ID generated from the Dashboard
      amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "dsp",
      description: "dsp",
      image: "https://example.com/your_logo",
      order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `http://localhost:8000/api/payment/verifyPayment?order_id=${order_id}`,
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {cartProducts?.map((products) => (
        <div className="flex flex-col justify-center items-center border border-10 border-red-500 h-32 w-max px-4">
          <div>{products.name}</div>
          <div>{products.description}</div>
        </div>
      ))}
      <button onClick={handlepayment}> Pay</button>
    </div>
  );
};

export default page;
