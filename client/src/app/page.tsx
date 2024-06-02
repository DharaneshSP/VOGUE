"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Data {
  id: string;
  email: string;
  name: string;
}

const page = () => {
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
        });
    }
  }, []);

  return (
    <div>
      {data ? <div>{JSON.stringify(data)}</div> : <div>No data found</div>}
    </div>
  );
};

export default page;
