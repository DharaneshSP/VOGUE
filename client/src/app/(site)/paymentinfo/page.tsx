"use client";


import React, {Suspense } from "react";
import PaymentStatus from '@/components/paymentstatus'

const Page = () => {
  return (
    <div className="pt-[10vh] h-[90vh] w-full flex justify-center items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentStatus />
      </Suspense>
    </div>
  );
};

export default Page;
