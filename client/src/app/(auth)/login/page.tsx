"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import {BACKEND} from '@/utils/constants'


const page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handlesubmit = (e: any) => {
    e.preventDefault();

    axios
      .get(
        `${BACKEND}/api/auth/login?email=${email}&password=${password}`
      )
      .then((response) => {
        let accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        router.push("/");
      })
      .catch((e) => alert(e));
  };

  return (
    <div className="h-screen border border-black flex justify-center items-center">
      <form
        className="flex flex-col max-w-96 gap-2 w-1/2"
        onSubmit={handlesubmit}
      > <Label className="my-3 font-bold text-2xl">Login</Label>
        <Label>Email Id</Label>
        <input
          className="p-3 mb-2 border border-black rounded focus:outline-none"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <Label>Password</Label>
        <input
          className="p-3 border border-black  rounded focus:outline-none"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-2 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
        <button
          type="submit"
          className="p-3 border bg-black rounded-md text-white border-black focus:outline-none"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default page;
