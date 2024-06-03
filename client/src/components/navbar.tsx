"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Data {
  id: string;
  email: string;
  name: string;
}

const Navbar = () => {
  const [data, setData] = useState<Data>();
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") as string;

    if (!accessToken) router.push("/login");
    else {
      axios
        .get("http://localhost:8000/api/auth/verifyUser", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (!response.data.auth) router.push("/login");
          else {
            console.log(response.data);
            setData({
              id: response.data.user.user_id,
              email: response.data.user.user_email,
              name: response.data.user.user_name,
            });
          }
        })
        .catch((err) => router.push("/login"));
    }
  }, []);

  return (
    <div className="border border-10 border-black h-[4rem]">
      {data ? (
        <div>
          {data.name} {data.email}
        </div>
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
};

export default Navbar;
