"use client";

import React, { useState,useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"


const page = () => {
  const [name, setName] = useState<string>("a");
  const [email, setEmail] = useState<string>("aa@gmail.com");
  const [password, setPassword] = useState<string>("12345678");
  const [otp, setOtp] = useState<string>("");
  const [show, setShow] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const [seconds,setSeconds]=useState(30);

  const router = useRouter();


useEffect(()=>{

  if(!show){
    
    const interval=setInterval(()=>{
       setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    },1000)

   return ()=>{ clearInterval(interval) }
    
  }

},[show])

  /*
  const handlesubmit = (e: any) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:8000/api/auth/initializeautentication?email=${email}`
      )
      .then((response) => {
        //sessionStorage.setItem("token", response.data.accessToken);
        console.log(response.data);
        setToken(response.data.token);
        setShow(!show);
        //router.push("/login");
      })
      .catch((e) => console.error(e.response.data));
  };

  const sendOtp = (e: any) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/auth/verifyandregister",
        {
          name: name,
          email: email,
          password: password,
          otp: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => console.log(response))
      .catch((e) => console.log(e.response));
  };
*/

  // REDIS

  const handlesubmit = (e: any) => {
    e.preventDefault();
    setShow(!show);
    return;
    axios
      .get(
        `http://localhost:8000/api/auth/initializeautentication1?email=${email}`
      )
      .then((response) => {
        setShow(!show);
      })
      .catch((e) => console.error(e.response.data));
  };

  const sendOtp = (e: any) => {
    e.preventDefault();
    alert(otp);
    return;
    axios
      .post("http://localhost:8000/api/auth/verifyandregister1", {
        name: name,
        email: email,
        password: password,
        otp: otp,
      })
      .then((response) => console.log(response))
      .catch((e) => console.log(e.response));
  };

  return (
    <div className="h-screen border border-black flex justify-center items-center">
      {show? (
        <form
          className="flex flex-col max-w-96 gap-2 w-1/2"
          onSubmit={handlesubmit}
        >
          <input
            className="p-3 border border-black focus:outline-none"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="p-3 border border-black focus:outline-none"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="p-3 border border-black focus:outline-none"
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="p-3 border border-black focus:outline-none"
          >
            Submit
          </button>
        </form>
      ) : (
        <form className="flex flex-col" onSubmit={sendOtp}>
          
           <InputOTP value={otp} onChange={(value)=>setOtp(value)} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} className="p-5" />
        <InputOTPSlot index={1} className="p-5" />
        <InputOTPSlot index={2} className="p-5" />
        <InputOTPSlot index={3} className="p-5" />
        <InputOTPSlot index={4} className="p-5" />
        <InputOTPSlot index={5} className="p-5" />
      </InputOTPGroup>
    </InputOTP>
          <div>Time Remaining {seconds}s</div>
          <button
            type="submit"
            className="p-3 border border-black focus:outline-none"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default page;
