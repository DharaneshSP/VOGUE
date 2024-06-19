"use client"


import React from 'react'
import Image from 'next/image'
import shoppingcart from '@/../public/shoppingcart.png'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import {BACKEND} from '@/utils/constants'

interface Product {
  category: string;
  description: string;
  id: string;
  img_url: string;
  name: string;
  price: string;
  seller_id: string;
  tags: string;
}

interface ProductCardProps {
  product: Product;
}

const productcard: React.FC<ProductCardProps> = ({ product }) => {

  const router = useRouter();

  const backgroundImageStyle = {
    backgroundImage: `url(${product.img_url})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain'
  };

  const addToCart = async () => {

    console.log(product.id);

    let accessToken = localStorage.getItem("accessToken");

    await axios.post(`${BACKEND}/api/cart/addToCart`, { product_id: product.id }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

  }

  const seeProductInfo = () => {

    router.push(`/product/${product.id}`)
  }

  return (
    <div className=" w-[45vh] border-0  border-gray-800 h-[70vh]">
      <div className={` h-[80%] w-full flex justify-center item-center`} style={backgroundImageStyle}>
      </div>
      <div className="border-0 border-black h-[10%] overflow-x-auto whitespace-nowrap p-2 ">
        <button onClick={seeProductInfo} className="font-robotocondensed text-xl">{product.name}</button>
      </div>
      <div className="font-robotocondensed h-full flex justify-between item-center px-2">
        <div>&#8377; {product.price}</div>
        <div><button onClick={addToCart} ><Image src={shoppingcart} height={15} width={15} alt="addtocart" /></button></div>
      </div>
    </div>
  )
}

export default productcard
