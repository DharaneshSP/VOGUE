"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  useState } from "react";
import axios from "axios";
import {useRouter} from 'next/navigation'

import {BACKEND,RAZOR_PAY_KEY_ID,RAZOR_PAY_KEY_SECRET} from '@/utils/constants'


const username=RAZOR_PAY_KEY_ID;
const password=RAZOR_PAY_KEY_SECRET;

const token = Buffer.from(`${username}:${password}`, "utf8").toString("base64");

export default function Registerseller() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile_no, setMobile_no] = useState<string>("");
  const [account_no, setAccount_no] = useState<string>("");
  const [ifsc_code, setIfsc_code] = useState<string>("");
  const [upi_id, setupi_id] = useState<string>("");
  const router =useRouter();

  const handlesubmitbyupi = () => {

  if(name.length>0 && email.length>0 && mobile_no.length>0 && upi_id.length>0){
    axios
      .post(
        `${BACKEND}/api/seller/createSellerbyvpc`,
        { name: name, email: email, mobile_number: mobile_no, upi_id: upi_id },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        },
      )
      .then(() => router.push("/seller"))
      .catch((err) => console.log(err));
    }
    else alert("Missing Field");
  };

  const handlesubmitbybankaccount=()=>{

  if(name.length>0 && email.length>0 && mobile_no.length>0 && account_no.length>0 && ifsc_code.length>0){
     axios
      .post(
        `${BACKEND}/api/seller/createSellerbyBankaccount`,
        { name: name, email: email, mobile_number: mobile_no, account_no:account_no,ifsc_code:ifsc_code},
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        },
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    }
    else alert("Missing Field");

  }

  return (
    <div className="pt-[10vh] w-full h-full flex justify-center items-center">
      <Tabs defaultValue="upi"  className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upi">UPI</TabsTrigger>
          <TabsTrigger value="bankaccount">BANK ACCOUNT</TabsTrigger>
        </TabsList>
        <TabsContent value="upi">
          <Card>
            <CardHeader>
              <CardTitle>UPI</CardTitle>
              <CardDescription>Provide Your Valid UPI Details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input
                  value={name}
                  placeholder="John"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  value={email}
                  placeholder="john@gmail.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Mobile Number</Label>
                <Input
                  value={mobile_no}
                  placeholder="9876543219"
                  required
                  onChange={(e) => setMobile_no(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>UPI ID</Label>
                <Input
                  value={upi_id}
                  required
                  placeholder="john@exampleupi"
                  onChange={(e) => setupi_id(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handlesubmitbyupi}>PROCEED</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="bankaccount">
          <Card>
            <CardHeader>
              <CardTitle>BANK ACCOUNT DETAILS</CardTitle>
              <CardDescription>
                Provide Your Valid Bank Account Details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input
                  value={name}
                  placeholder="John"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  value={email}
                  placeholder="john@gmail.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Mobile Number</Label>
                <Input
                  value={mobile_no}
                  placeholder="9876543219"
                  required
                  onChange={(e) => setMobile_no(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Account Number</Label>
                <Input
                  value={account_no}
                  placeholder="9876543219"
                  required
                  onChange={(e) => setAccount_no(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label>IFSC CODE</Label>
                <Input
                  value={ifsc_code}
                  placeholder="9876543219"
                  required
                  onChange={(e) => setIfsc_code(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handlesubmitbybankaccount}>PROCEED</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
