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

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {cartProducts?.map((products) => (
        <div className="flex flex-col justify-center items-center border border-10 border-red-500 h-32 w-max px-4">
          <div>{products.name}</div>
          <div>{products.description}</div>
        </div>
      ))}
    </div>
  );
};

export default page;
