"use client"

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import axios from "axios";
import {BACKEND} from '@/utils/constants'

interface orderItem {
  id: string;
  name: string;
  price: string;
  count: number;
}

interface PageProps {
  params: {
    id: string;
  };
}

const page: React.FC<PageProps> = ({ params }) => {
  const [currorders, setorders] = useState<orderItem[]>([]);
  const [total_cost, setTotal_cost] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    console.log(params.id);
    axios
      .get(
        `${BACKEND}/api/order/getOrderedItems?order_id=${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        setorders(res.data.items);
        setTotal_cost(res.data.total_cost);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlepayment = (e: any) => {
    e.preventDefault();
    router.push(`/payment/${params.id}`);
  };

  return (
    <div className="pt-[10vh] px-5">
      <Table className="mb-[12vh]">
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader className="font-medium">
          <TableRow>
            <TableHead className="">Product</TableHead>
            <TableHead>Price (&#8377;)</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Amount (&#8377;)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currorders.map((item) => (
            <TableRow>
              <TableCell className="whitespace-nowrap">{item.name}</TableCell>
              <TableCell>{parseFloat(item.price).toFixed(2)}</TableCell>
              <TableCell>{item.count}</TableCell>
              <TableCell className="text-right">
                {(parseFloat(item.price) * item.count).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="font-bold">
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{total_cost}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="h-[10vh] border-[0px] border-black fixed bottom-0 left-0 right-0 flex justify-between items-center px-[3vw] bg-white">
        <Button
          className="bg-white text-black hover:text-white border-[1px] border-black"
          onClick={() => router.push("/product")}
        >
          Cancel
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Proceed</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Before proceeding with your payment, please take a moment to
                review the details of your order carefully.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handlepayment}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default page;
