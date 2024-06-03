"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
//import { products } from "@/utils/products";

interface products {
  id: string;
  name: string;
  description: string;
  price: number;
  seller_id: string;
}

const page = () => {
  const [products, setProducts] = useState<products[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product/getProducts")
      .then((res) => setProducts(res.data))
      .catch((e) => setProducts([]));
  }, []);

  const addtocart = (id: string, name: string) => {
    console.log(id);
  };

  return (
    <div>
      {products.map((product) => (
        <div className="gap-2">
          <div>
            {product.name}
            {product.description}
          </div>
          <button onClick={() => addtocart(product.id, product.seller_id)}>
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default page;
