"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingButton } from "@/components/ui/loading-button";
import axios from "axios";
import { useRouter } from "next/navigation";

import {BACKEND} from '@/utils/constants'

interface servercartItem {
  category: string;
  count: number;
  created_at: string;
  description: string;
  id: string;
  img_url: string;
  name: string;
  price: string;
  product_id: string;
  seller_id: string;
  tags: string;
  updated_at: string;
  user_id: string;

}

interface cartItem extends servercartItem {
  selected: boolean;
}


export default function Page() {
  const [cart, setCart] = useState<cartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${BACKEND}/api/cart/getCart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const modifiedCart: cartItem[] = res.data.data.rows.map((item: servercartItem) => ({
          ...item,
          selected: false,
        }));
        setCart(modifiedCart);
      });
  }, []);

  const handleQuantityChange = (id: string, count: number) => {
    setCart((cart) =>
      cart.map((item) => (item.id === id ? { ...item, count } : item))
    );

    let accessToken = localStorage.getItem("accessToken");

    axios.put(
      `${BACKEND}/api/cart/changeQuantity`,
      { id, count },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((cart) => cart.filter((item) => item.id !== id));

    let accessToken = localStorage.getItem("accessToken");

    axios.delete(`${BACKEND}/api/cart/deleteCartItem?id=${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const toggleSelect = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const checkout = () => {
    const selected_items = cart.filter((item) => item.selected);
    if (selected_items.length > 0) {
      setLoading(true);
      let accessToken = localStorage.getItem("accessToken");
      axios
        .post(
          `${BACKEND}/api/order/makeOrder`,
          { items: selected_items },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => router.push(`/order/${res.data.order.id}`))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      alert("Select items");
    }
  };

  const total: number = cart.reduce((acc: number, item: cartItem) => {
    if (item.selected) {
      return acc + (parseFloat(item.price) * item.count);
    }
    return acc;
  }, 0);

  return (
    <div className="container mx-auto py-12 pt-[12vh] mb-[4vh] h-full">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          {cart.map((item) => (
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
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuantityChange(item.id, item.count - 1)}
                  disabled={item.count === 1}
                >
                  -
                </Button>
                <span>{item.count}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuantityChange(item.id, item.count + 1)}
                >
                  +
                </Button>
                <Checkbox
                  className="h-5 w-5"
                  checked={item.selected}
                  onCheckedChange={() => toggleSelect(item.id)}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>&#8377; {total.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>&#8377; 0.00</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>&#8377; {total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <LoadingButton
              size="lg"
              className="w-full"
              loading={loading}
              onClick={checkout}
            >
              Proceed to Checkout
            </LoadingButton>
          </CardFooter>
        </Card>
      </div>
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

