"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import shoppingbag from '../../public/shoppingbag.png';
import user from '../../public/user.png';
import Image from 'next/image'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Data {
  id: string;
  email: string;
  name: string;
}

const navbar = () => {
  const [data, setData] = useState<Data>();
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") as string;

    if (0) {
      if (0 && !accessToken) router.push("/login");
      else {
        axios
          .get("http://localhost:8000/api/auth/verifyUser", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            if (!response.data.auth && 1) router.push("/login");
            else {
              console.log(response.data);
              setData({
                id: response.data.user.user_id,
                email: response.data.user.user_email,
                name: response.data.user.user_name,
              });
            }
          })
          .catch((err) => {
            if (0) {
              router.push("/login");
            }
          });
      }
    };
  }, []);

  return (
    <div className=" h-[4rem] border border-0 border-black bg-white z-50 fixed left-0 right-0 flex justify-between items-center px-5">
      <div className="font-lato ">VOGE</div>
      <div className="flex gap-5 ">
        <button><Image src={shoppingbag} height={15} width={15} alt="shop" /></button>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none"><Image src={user} height={15} width={15} alt="shop" /></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel> DAVID </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cart</DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem>Upload Product</DropdownMenuItem>
              <DropdownMenuItem>Wallet</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

    </div>
  );
};

export default navbar;
