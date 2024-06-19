"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import shoppingbag from "../../public/shoppingbag.png";
import user from "../../public/user.png";
import Image from "next/image";
import Link from "next/link";
import { BACKEND } from "@/utils/constants";

interface Data {
  id: string;
  email: string;
  name: string;
}

const navbar = () => {
  const [auth, setauth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) setauth(false);
    else {
      axios
        .get(`${BACKEND}/api/auth/verifyUser`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (!response.data.auth) setauth(false);
          else {
            console.log(111);
            setauth(true);
          }
        })
        .catch((err) => {
          setauth(false);
        });
    }
  }, []);

  const navLinks = [
    {
      img: shoppingbag,
      alt: "shop",
      link: auth ? "/product" : "/",
      authRequired: false,
    },
    {
      img: user,
      alt: "user",
      link: "/login",
      authRequired: true,
    },
  ];

  return (
    <div className=" h-[4rem] border-0 border-black  z-50 fixed left-0 right-0 flex justify-between items-center px-5">
      <Link href="/" className="font-lato ">
        VOGUE
      </Link>
      <div className="flex gap-5 ">
        {navLinks
          .filter((link) => link.authRequired || auth)
          .map((link) => (
            <Link href={link.link}>
              <Image src={link.img} height={15} width={15} alt={link.alt} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default navbar;
