"use client"


import React, { useEffect, useState } from 'react'

import {Button} from "@/components/ui/button"
import axios from 'axios';

import {BACKEND} from '@/utils/constants'

interface PageProps{
  params:{
    id:string;
  }  
}

interface Product{
  category:string;
  description:string;
  img_url:string;
  name:string;
  price:string;
  seller_name:string;
}

const initialProduct: Product = {
  category: '',
  description: '',
  img_url: '',
  name: '',
  price: '',
  seller_name: ''
};

const page:React.FC<PageProps> = ({params}) => {

  const [product,setProduct]=useState<Product>(initialProduct);
  const [show,setshow]=useState<boolean>(false);

useEffect(()=>{
    
    let id=params.id;
    let accessToken=localStorage.getItem("accessToken");
    axios.get(`${BACKEND}/api/product/getProductDetails?id=${id}`,{
headers:{
Authorization:`Bearer ${accessToken}`
}
    })
    .then((res)=>{setProduct(res.data.data[0]); setshow(true)  })
    .catch((err)=>console.log(err))


},[])

  const addToCart=()=>{



    let accessToken=localStorage.getItem("accessToken");
    
   axios.post(`${BACKEND}/api/cart/addToCart`,{product_id:params.id},{
        headers:{
          Authorization: `Bearer ${accessToken}`
          } 
    })
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));

  }


  return (
 
   <div className="pt-[10vh] h-full w-screen">
   {show && 
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 py-4">
      <div className="grid gap-6">
        <img
          src={product.img_url}
          alt="Product Image"
          width={100}
          height={100}
          className="rounded-lg object-cover w-full aspect-square"
        />
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground">
           {product.description}          </p>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Category:</span>
            <span className="text-sm text-muted-foreground">{product.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Seller:</span>
            <span className="text-sm text-muted-foreground">{product.seller_name}</span>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Price:</span>
            <span className="text-2xl font-bold">&#8377; {product.price}</span>
          </div>
          <Button onClick={addToCart} size="lg">Add to Cart</Button>
        </div>
      </div>
    </div>
    }
    </div>
    )
  

 }

export default page
