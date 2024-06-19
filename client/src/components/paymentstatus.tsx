"use client"

import { useSearchParams } from "next/navigation";
import React,{ useEffect, useState } from "react";

const PaymentStatus = () => {
  const params = useSearchParams();
  const [status, setStatus] = useState(false);
  const [payment_id, setPayment_id] = useState<string|null>(null);

  useEffect(() => {
    setStatus(params.get("success") === "true");
    setPayment_id(params.get("payment_id"));
  }, [params]);

  if (!payment_id) return null;

  return (
    <div>
      {status ? (
        <div className="text-4xl font-lato">Payment Successful</div>
      ) : (
        <div className="text-4xl font-lato">Payment Failed</div>
      )}
    </div>
  );
};

export default PaymentStatus
