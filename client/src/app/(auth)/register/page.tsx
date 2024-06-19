"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";

import { BACKEND } from "@/utils/constants";

const page = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [show, setShow] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const [seconds, setSeconds] = useState(30);
  const [address, setaddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [loading, setloading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!show) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [show]);

  const handleChange = (e: any) => {
    const { value } = e.target;
    const regex = /^\d{10}$/;
    const curregex = /^\d{0,10}$/;
    setPhone((prev) => (curregex.test(value) ? value : prev));
    setIsValid(regex.test(value));
  };

  const handlesubmit = (e: any) => {
    e.preventDefault();
    console.log(isValid, phone);
    if (isValid) {
      setloading(true);
      axios
        .get(`${BACKEND}/api/auth/initializeautentication?email=${email}`)
        .then((response) => {
          console.log(response.data);
          setToken(response.data.token);
          setShow(!show);
          //router.push("/login")
        })
        .catch((e) => console.error(e.response.data));
    } else alert("Enter Valid Input");
  };

  const sendOtp = (e: any) => {
    e.preventDefault();
    if (seconds >= 1) {
      axios
        .post(
          `${BACKEND}/api/auth/verifyandregister`,
          {
            name: name,
            email: email,
            password: password,
            address: address,
            mobile_no: phone,
            otp: otp,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => router.push("/login"))
        .catch((e) => console.log(e.response));
    } else alert("time over");
  };

  // REDIS

  /*
  const handlesubmit = (e: any) => {
    e.preventDefault();
    setShow(!show);
    return;
    axios
      .get(
        `${BACKEND}/api/auth/initializeautentication1?email=${email}`
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
      .post(`${BACKEND}/api/auth/verifyandregister1`, {
        name: name,
        email: email,
        password: password,
        otp: otp,
      })
      .then((response) => console.log(response))
      .catch((e) => console.log(e.response));
  };
*/
  return (
    <div className="pt-[9vh]  h-screen  border-black flex justify-center items-center">
      {show ? (
        <form
          className="flex flex-col max-w-96 gap-2 w-1/2 pb-2"
          onSubmit={handlesubmit}
        >
          <Label className="my-3 font-bold text-2xl">Register</Label>
          <Label>Name</Label>
          <input
            className="p-3 mb-2 border border-black rounded-md focus:outline-none"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label>Email Id</Label>
          <input
            className="p-3 mb-2 border border-black rounded-md focus:outline-none"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Password</Label>
          <input
            className="p-3 mb-2 border border-black rounded-md focus:outline-none"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label>Address</Label>
          <textarea
            className="p-1 pl-3 mb-2 border border-black rounded-md focus:outline-none"
            placeholder="address"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          />

          <Label htmlFor="phone">Phone Number</Label>
          <div className="flex items-center border-[1px] border-black rounded-md bg-background px-3 py-2  outline-none">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <FlagIcon className="h-5 w-5" />
                <span className="text-muted-foreground">+91</span>
              </div>
              <div className="h-5 w-[1px] bg-muted" />
            </div>
            <input
              id="phone"
              type="tel"
              pattern="^\d{10}$"
              value={phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full  bg-transparent focus:ring-0 outline-none"
            />
          </div>
          <LoadingButton
            type="submit"
            size="lg"
            className="p-3 border border-black focus:outline-none bg-black text-white rounded-md"
            loading={loading}
            onClick={handlesubmit}
          >
            Register
          </LoadingButton>
        </form>
      ) : (
        <form
          className="flex flex-col justify-center items-center border-[0px] border-black m-3"
          onSubmit={sendOtp}
        >
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="p-7" />
              <InputOTPSlot index={1} className="p-7" />
              <InputOTPSlot index={2} className="p-7" />
              <InputOTPSlot index={3} className="p-7" />
              <InputOTPSlot index={4} className="p-7" />
              <InputOTPSlot index={5} className="p-7" />
            </InputOTPGroup>
          </InputOTP>
          <div className="mt-3">Time Remaining {seconds}s</div>
          <button
            type="submit"
            className="p-2 m-3 border border-black rounded-md bg-black text-white focus:outline-none"
          >
            Submit
          </button>
          <h1 className="text-gray-500">
            An OTP has been sent to your email id
          </h1>
        </form>
      )}
    </div>
  );
};

export default page;

function FlagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}
