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
  TableFooter
} from "@/components/ui/table";
import {Button} from "@/components/ui/button"

import {orders} from "../../../../utils/products";

interface order{
  
  id:string;
  name:string;
  price:number;
  count:number;

}

const page = ({ params }) => {
  
  const [currorders,setorders]=useState<order[]>([]);

  useEffect(()=>{
      
      console.log(orders);
      setorders(orders);

  },[])

  const handlepayment = (e: any) => {
    e.preventDefault();

    // fetch price alone from order id

    console.log(window);

    const order_id="order_OJa5dmI3ghv4mN";

    const options = {
      key: "rzp_test_BId9XKXtg6oGMG", 
      amount: "50000",
      currency: "INR",
      name: "dsp",
      description: "dsp",
      image: "https://example.com/your_logo",
      order_id: order_id,       
      callback_url: `http://localhost:8000/api/payment/verifyPayment?order_id=${order_id}`,
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };
  


  return (
    <div className="pt-[10vh] px-5">
      <Table className="mb-[12vh]">
        <TableCaption>A list of your ordered products.</TableCaption>
        <TableHeader className="font-medium">
          <TableRow>
            <TableHead className="">Product</TableHead>
            <TableHead>Price (&#8377;)</TableHead>
            <TableHead>Count</TableHead>
            <TableHead className="text-right">Amount (&#8377;)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
          currorders.map((item)=>(
          <TableRow>
            <TableCell className="whitespace-nowrap">{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.count}</TableCell>
            <TableCell className="text-right">{item.price * item.count}</TableCell>
          </TableRow>
            ) )
          }
        </TableBody>
        <TableFooter className="font-bold">
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
      </Table>

    <div className="h-[10vh] border-[0px] border-black fixed bottom-0 left-0 right-0 flex justify-between items-center px-[3vw] bg-white">
        <Button className="bg-white text-black hover:text-white border-[1px] border-black">Cancel</Button>
        <Button>Proceed</Button>
    </div>

    </div>
  );
};

export default page;
