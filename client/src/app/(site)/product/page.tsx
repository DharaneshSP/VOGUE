"use client";

import React, { useState, useEffect } from "react";
import Filterdialog from "@/components/filterdialog";
import { useProductStore } from "@/utils/store";
import Productcard from "@/components/productcard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import axios from 'axios';
import {BACKEND} from '@/utils/constants'

interface Product {
  category: string;
  description: string;
  id: string;
  img_url: string;
  name: string;
  price: string;
  seller_id: string;
  tags: string;
}

const Page = () => {
  const { currproducts, setcurrProducts } = useProductStore();
  const [currquery, setcurrquery] = useState("");
  const [query, setquery] = useState("");


  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    axios.get(`${BACKEND}/api/product/getProducts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((res) => { setcurrProducts(res.data) })
      .catch((err) => console.log(err))

  }, []);


  const isSearched = (product: Product) => {
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

  const handlequerychange = (e: any) => {
    e.preventDefault();
    const newQuery = e.target.value.toLocaleLowerCase();
    setcurrquery(newQuery);
  };

  const search = () => {
    console.log(currquery);
    setquery(currquery);
  }

  return (
    <div className="py-[4rem] h-full">
      <div className="fixed px-[4vw] py-4 flex border-black w-full gap-3 bg-white">

        <Input
          type="text"
          className="bg-white"
          value={currquery}
          placeholder="Search Your Items"
          onChange={handlequerychange}
        />
        <Button onClick={search}>Search</Button>

        <Filterdialog />
      </div>
      <div className="pl-[4vw] pt-10 flex flex-wrap gap-[3vw] border left-0 right-0 bg-white">
        {currproducts.map(
          (product: Product) => isSearched(product) && <Productcard product={product} />,
        )}
      </div>
    </div>
  );
};

export default Page;
