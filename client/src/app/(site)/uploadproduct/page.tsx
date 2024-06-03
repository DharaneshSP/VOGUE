"use client";

import axios from "axios";
import React, { useState } from "react";

const page = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(199);

  const handlesubmit = (e: any) => {
    e.preventDefault();
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
        <input
          className="p-3 border border-black rounded focus:outline-none"
          type="text"
          placeholder="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-3 border border-black  rounded focus:outline-none"
          type="text"
          placeholder="description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="p-3 border border-black  rounded focus:outline-none"
          type="number"
          placeholder="price"
          value={price}
          required
          onChange={(e) => setPrice(parseInt(e.target.value))}
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
