"use client"

import { BACKEND,RAZOR_PAY_KEY_ID } from '@/utils/constants';
import React, { useEffect,useState } from 'react'

interface PageProps{
  params:{
    id:string;
  }
}

interface RazorpayOptions {
  key: string;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  callback_url: string;
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

interface Razorpay {
  new (options: RazorpayOptions): {
    open: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: Razorpay;
  }
}

const page:React.FC<PageProps> = ({params}) => {

  const [isWindowAvailable, setIsWindowAvailable] = useState(false);

 useEffect(()=>{

    setIsWindowAvailable(typeof window!=undefined)
    if(isWindowAvailable){
        initializePayment();
    }

 },[isWindowAvailable]) 

 const initializePayment=()=>{

     
    const order_id=params.id;
 
    const options = {
      key: RAZOR_PAY_KEY_ID, 
      currency: "INR",
      name: "VOGUE",
      description: "YOUR LIFESTYLE PARTNER",
      image: "https://example.com/your_logo",
      order_id: order_id,       
      callback_url: `${BACKEND}/api/payment/verifyPayment?order_id=${order_id}`,
      notes: {
        address: "Vogue Corporate Office",
      },
      theme: {
        color: "#000000",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  }
  



  return (
    <div className="h-[90vh] w-full flex justify-center items-center">
        <button onClick={initializePayment}>
            Retry
        </button>
    </div>
  )
}

export default page
