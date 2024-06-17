"use client";

import React, { useEffect, useState } from "react";
import { cart } from "@/utils/products";
import Image from "next/image";
import { IoIosArrowDropright as Rightarrow } from "react-icons/io";
import { IoIosArrowDropleft as Leftarrow } from "react-icons/io";
import { MdDeleteOutline as Delete } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface cart {
  id: string;
  name: string;
  description: string;
  category: string;
  img_url: string;
  price: number;
  rating: number;
  selected: boolean;
}

const page = ({ params }) => {
  const [currcart, setCart] = useState<cart[]>([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const modifiedCart = cart.map((item) => ({ ...item, selected: false }));
    console.log(modifiedCart);
    setCart(modifiedCart);
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [currcart]);

  const calculateTotalPrice = () => {
    const price = currcart.reduce((acc, item) => {
      if (item.selected) {
        return acc + item.price * item.count;
      }
      return acc;
    }, 0);
    setPrice(price);
  };

  const increment = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    );
  };

  const decrement = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item,
      ),
    );

    console.log(2);
  };

  const toggleselect = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );

    console.log(currcart);
  };

  const deleteitem = (id: string) => {
    console.log(currcart);
    const filterproduct = currcart.filter((item) => item.id != id);
    console.log(filterproduct);

    setCart(filterproduct);
  };

  return (
    <div className="pt-[20vh] pl-5 flex flex-wrap gap-4">
      {currcart.map((item) => (
        <section
          className="w-[46vh] rounded border-black h-[28vh] flex border-[0px] p-1 shadow-lg"
          style={{ borderWidth: item.selected ? "2px" : "0px" }}
        >
          <div
            className={`w-2/5 bg-red-200 h-full bg-no-repeat bg-center bg-cover`}
            style={{ backgroundImage: `url(${item.img_url})` }}
          ></div>
          <div className="w-3/5 h-full p-1 backdrop-blur-lg">
            <div className="border-[0px] font-robotocondensed h-1/3 overflow-y-auto border-black">
              {item.name}
            </div>
            <div className="border-[0px] h-1/3 border-black font-bold">
              <div> &#8377; {item.price} </div>
            </div>
            <div className="border-[0px] h-1/3 border-black flex justify-between items-center">
              <div className="flex justify-center items-center border-[0px] border-black h-[10px]">
                <button onClick={() => decrement(item.id)}>
                  <Leftarrow />
                </button>
                <div className="px-[3px] pb-[0.5vh]">{item.count}</div>
                <button onClick={() => increment(item.id)}>
                  <Rightarrow />
                </button>
              </div>

              <div>
                <Checkbox
                  checked={item.selected == true}
                  onCheckedChange={() => toggleselect(item.id)}
                />
                <button onClick={() => deleteitem(item.id)}>
                  <Delete className="mt-[1px] ml-[2px]" />
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}

      <div className="h-15 bg-white border-[0px] pt-3 pb-2 fixed bottom-0 left-0 right-0 backdrop-blur-md">
        <div className="flex justify-between items-center px-5">
          <div className="font-robotocondensed text-lg font-bold">
            Total Cost : &#8377; {price}
          </div>
          <Button className="border-black bg-black text-white">
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
