"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handlesubmit = (e: any) => {
    e.preventDefault();

    axios
      .get(
        `http://localhost:8000/api/auth/login?email=${email}&password=${password}`
      )
      .then((response) => {
        let accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        router.push("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="h-screen border border-black flex justify-center items-center">
      <form
        className="flex flex-col max-w-96 gap-2 w-1/2"
        onSubmit={handlesubmit}
      >
        <input
          className="p-3 border border-black rounded focus:outline-none"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-3 border border-black  rounded focus:outline-none"
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="p-3 border bg-black rounded text-white border-black focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
