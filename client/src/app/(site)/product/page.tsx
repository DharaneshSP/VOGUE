"use client";

import React, { useState, useEffect } from "react";
import { products } from "@/utils/products";
import Filterdialog from "@/components/filterdialog";
import { useProductStore } from "@/utils/store";
import Productcard from "@/components/productcard";
import { Input } from "@/components/ui/input";

const Page = () => {
  const { currproducts, setcurrProducts } = useProductStore();

  useEffect(() => {
    setcurrProducts(products);
  }, []);

  const [query, setquery] = useState("");

  const isSearched = (product) => {
    return (
      product.name.toLocaleLowerCase().includes(query) ||
      product.description.toLocaleLowerCase().includes(query) ||
      product.name
        .toLocaleLowerCase()
        .replace(/[\s-]+/g, " ")
        .trim()
        .includes(query) ||
      product.description
        .toLocaleLowerCase()
        .replace(/[\s-]+/g, " ")
        .trim()
        .includes(query) ||
      query.trim().length == 0
    );
  };

  const handlequerychange = (e) => {
    e.preventDefault();

    const newQuery = e.target.value.toLocaleLowerCase();
    setquery(newQuery);
  };

  return (
    <div className="pt-[4rem]">
      <div className="fixed px-[4vw] py-4 flex border border-0 border-black w-full gap-3 bg-white">
        <Input
          type="text"
          className="bg-white"
          value={query}
          onChange={handlequerychange}
        />
        <Filterdialog />
      </div>
      <div className="pl-[4vw] flex flex-wrap gap-[3vw] border left-0 right-0 bg-white">
        {currproducts.map(
          (product) => isSearched(product) && <Productcard product={product} />,
        )}
      </div>
    </div>
  );
};

export default Page;
