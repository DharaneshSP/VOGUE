"use client";

import React, { useState } from "react";
import { products } from "@/utils/products";

const Page = () => {
  const [currproducts, setcurrproducts] = useState(products);
  const [query, setquery] = useState("");

  const handlequerychange = (e) => {
    e.preventDefault();

    const newQuery = e.target.value.toLocaleLowerCase();
    setquery(newQuery);

    const filtereditems = products.filter((product) =>
      product.name.toLocaleLowerCase().includes(newQuery) || 
      product.description.toLocaleLowerCase().includes(newQuery) ||
      product.name.toLocaleLowerCase().replace(/[\s-]+/g, " ").trim().includes(newQuery) ||
      product.description.toLocaleLowerCase().replace(/[\s-]+/g, " ").trim().includes(newQuery)
    );

    setcurrproducts(filtereditems);
  };

  return (
    <div className="pt-[4rem]">
      <input type="text" value={query} onChange={handlequerychange} />
      {currproducts.map((item) => (
        <div key={item.id} className="">
          {item.name} {item.description} {item.rating} {item.category} {item.price}
        </div>
      ))}
    </div>
  );
};

export default Page;

