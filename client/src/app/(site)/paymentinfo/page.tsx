
"use client"

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

  const params=useSearchParams();
  const [status,setStatus]=useState<boolean>(false);
  const [payment_id,setpayment_id]=useState<string>("");


  useEffect(()=>{

    setStatus(params.get("success")==="true");
    setpayment_id(params.get("payment_id"));

  },[])

  return (
    <div>{(status)?"true":"false"} : {payment_id}</div>
  )
}

export default page
