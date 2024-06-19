"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BACKEND } from "@/utils/constants";

interface Seller {
  contact_id: string;
  fund_id: string;
  fund_type: string;
  id: string;
  mobile_no: string;
  name: string;
  user_id: string;
  wallet: string;
}

interface Product {
  category: string;
  created_at: string;
  description: string;
  id: string;
  img_url: string;
  name: string;
  price: string;
  seller_id: string;
  tags: string;
  updated_at: string;
}

export default function Page() {
  const [products, setProduct] = useState<Product[]>([]);
  const [seller, setseller] = useState<Seller | null>(null);

  const router = useRouter();

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${BACKEND}/api/seller/getSellerDetails`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setProduct(res.data.products);
        setseller(res.data.seller);
        console.log(res.data.seller, res.data.products);
      })
      .catch((err) => {
        if (err.response.data.msg == "Not an Seller") {
          router.push("/registerseller");
        }
      });
  }, []);

  const payout = () => {
    let accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);

    fetch(`${BACKEND}/api/payment/payout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(()=> console.log("Done"))
    .catch((err)=>console.log("err : ",err))
  };

  const uploadproduct = () => {
    router.push("/uploadproduct");
  };

  const deleteproduct = (item: Product) => {
    const filteredproduct = products.filter((curitem) => curitem.id != item.id);
    setProduct(filteredproduct);

    let accessToken = localStorage.getItem("accessToken");
    axios
      .delete(`${BACKEND}/api/product/deleteProduct?id=${item.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto py-12 pt-[12vh]">
      {seller != null && (
        <div>
          <h1 className="text-2xl font-bold mb-6">Your Products</h1>
          <div className="grid md:grid-cols-[1fr_300px] gap-8">
            <div className="space-y-6">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[100px_1fr_auto] items-center gap-4"
                >
                  <img
                    src={item.img_url}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      &#8377; {item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.category}
                    {/*
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={()=>deleteproduct(item)}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button> */}
                  </div>
                </div>
              ))}
            </div>
            <Card>
              <CardHeader>
                <CardTitle>{seller.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Wallet</span>
                  <span>&#8377; {seller.wallet}</span>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <Button size="lg" className="w-full" onClick={payout}>
                    Retrieve Money
                  </Button>
                  <Button
                    size="lg"
                    className="w-full bg-white text-black hover:bg-black hover:text-white"
                    onClick={uploadproduct}
                  >
                    Upload Products
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function Trash2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
