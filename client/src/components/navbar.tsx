"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import shoppingbag from "../../public/shoppingbag.png";
import user from "../../public/user.png";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {BACKEND} from '@/utils/constants'

interface Data {
  id: string;
  email: string;
  name: string;
}

const Navbar = () => {
  const [data, setData] = useState<Data>({} as Data);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") as string;
    if (1) {
      if (0 && !accessToken) router.push("/login");
      else {
        axios
          .get(`${BACKEND}/api/auth/verifyUser`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            if (!response.data.auth && 1) router.push("/login");
            else {
              console.log(response.data);
              setData({
                id: response.data.user.user_id,
                email: response.data.user.user_email,
                name: response.data.user.user_name,
              });
            }
          })
          .catch(() => {
            if (0) {
              router.push("/login");
            }
          });
      }
    }
  }, []);

  const closeDropdown = useCallback(() => setOpen(false), []);

  const UnknownUser = [
    { title: "Login", link: "/login" },
    { title: "SignUp", link: "/register" },
  ];

  const VerifiedUser = [
    { title: "Cart", link: `/cart/${data.id}` },
    { title: "Orders", link: `/order` },
    { title: "Sell", link: "/seller" },
  ];

  const logout = () => {
    localStorage.removeItem("accessToken");
    router.push("/");
  };

  return (
    <div className="h-[4rem] bg-white z-50 fixed left-0 right-0 flex justify-between items-center px-5">
      <Link href="/" className="font-lato">VOGUE</Link>
      <div className="flex gap-5 ">
        <button onClick={()=> router.push("/product")}>
          <Image src={shoppingbag} height={15} width={15} alt="shop" />
        </button>
        <div>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none">
                <Image src={user} height={15} width={15} alt="shop" />
              </button>
            </DropdownMenuTrigger>
            {Object.keys(data).length > 0 ? (
              <DropdownMenuContent>
                <DropdownMenuLabel>{data.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {VerifiedUser.map((item) => (
                  <DropdownMenuItem key={item.title}>
                    <Link className="w-full" href={item.link} onClick={closeDropdown}>
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem>
                  <button
                    className="w-full text-left"
                    onClick={() => {
                      logout();
                      closeDropdown();
                    }}
                  >
                    Log Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent>
                <DropdownMenuLabel>UNKNOWN</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {UnknownUser.map((item) => (
                  <DropdownMenuItem key={item.title}>
                    <Link className="w-full" href={item.link} onClick={closeDropdown}>
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
