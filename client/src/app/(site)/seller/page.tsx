
"use client"

import React, { useState } from 'react'

const page = () => {

  const [mobile_number,setMobile_number]=useState("");
  const [account_no,setaccount_no]=useState("");
  const [ifsc_code,setifsc_code]=useState("");


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

  )
}

export default page
