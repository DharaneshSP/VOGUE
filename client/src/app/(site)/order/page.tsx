"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {BACKEND} from '@/utils/constants'

interface Order{
  created_at:string;
  delivered:boolean;
  delivered_at:string;
  id:string;
  payment_id:string;
  paymentdone:boolean;
  receipt_id:string;
  total_cost:string;
  updated_at:string;
  user_id:string;
}


const page = () => {

  const [orders,setOrders]=useState<Order[]>([]);

useEffect(()=>{
    
  let accessToken=localStorage.getItem("accessToken");

axios.get(`${BACKEND}/api/order/getOrders`,{
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
  })
.then((res)=> {setOrders(res.data.data);console.log(res.data.data)})
.catch((err)=>console.log(err))


},[])

  return (
    <div className="pt-[15vh] px-5">
      <Table>
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead >Order Id</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>PaymentDone</TableHead>
          <TableHead >Delivered</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.total_cost}</TableCell>
            <TableCell>{(order.paymentdone)?"Yes":"No"}</TableCell>
            <TableCell >{(order.delivered)?"Yes":"No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

export default page
