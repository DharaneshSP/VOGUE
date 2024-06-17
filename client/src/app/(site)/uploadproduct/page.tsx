"use client";

import axios from "axios";
import React, { useState } from "react";
import { Input } from "@/components/ui/input"
import {Label} from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select"


const page = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(199);
  const [category,setCategory]=useState("");

  const handlesubmit = (e: any) => {
 
    e.preventDefault();

    console.log(name,description,price,category);
    return;

        const accessToken = localStorage.getItem("accessToken");
    const data = {
      name: name,
      description: description,
      price: price,
      accessToken: accessToken,
    };

    axios
      .post(
        "http://localhost:8000/api/product/upload-product",
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}a`,
          },
        }
      )
      .then((res) => console.log("Done"))
      .catch((err) => console.log("Not Uploaded"));
  };

  return (
    <div className="h-screen border border-black flex justify-center items-center">
      <form
        className="flex flex-col max-w-96 gap-2 w-1/2"
        onSubmit={handlesubmit}
      >
        <Label>Product Name</Label>
        <Input
          className="p-3 border border-black  rounded focus:outline-none"
          type="text"
          placeholder="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <Label>Product Description</Label>
        <Input
          className="p-3 border border-black  rounded focus:outline-none"
          type="text"
          placeholder="description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />

        <Label>Product Price</Label>
        <Input
          className="p-3 border border-black  rounded focus:outline-none"
          type="number"
          placeholder="price"
          value={price}
          required
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />

        <Label>Product Category</Label>
        <Select required onValueChange={(value)=>setCategory(value)} >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
          <SelectGroup>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Footwear">Footwear</SelectItem>
            <SelectItem value="Accessories">Accessories</SelectItem>
            <SelectItem value="Cosmetics">Cosmetics</SelectItem>
           </SelectGroup> 
          </SelectContent>
        </Select>

        <Label>Product's Image</Label>
        <Input
          type="file"
          placeholder="product image"
          required
        />

        <button
          type="submit"
          className="p-3 border bg-black rounded text-white border-black focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
