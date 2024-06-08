
"use client"

import React, { useState } from "react";

const page = () => {
  
  const [val,setval]=useState("aa");

  const log= ()=>{
    console.log(val);
  }

  return(<div>
      page 2
      <button onClick={log}>cc</button>
      </div>);
};

export default page;
