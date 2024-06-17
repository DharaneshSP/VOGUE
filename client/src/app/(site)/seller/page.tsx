"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"



export default function TabsDemo() {
 
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [mobile_no,setMobile_no]=useState("");
  const [account_no,setAccount_no]=useState("");
  const [ifsc_code,setIfsc_code]=useState("");
  const [upi_id,setupi_id]=useState("");
   

  return (
  <div className="pt-[10vh] w-full h-full flex justify-center items-center">
    <Tabs defaultValue="upi" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upi">UPI</TabsTrigger>
        <TabsTrigger value="bankaccount">BANK ACCOUNT</TabsTrigger>
      </TabsList>
      <TabsContent value="upi">
        <Card>
          <CardHeader>
            <CardTitle>UPI</CardTitle>
            <CardDescription>
              Provide Your Valid UPI Details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
              <div className="space-y-1">
              <Label>Name</Label>
              <Input value={name} placeholder="John" onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label >Email</Label>
              <Input value={email} placeholder="john@gmail.com" onChange={(e)=> setEmail(e.target.value)} />
            </div>
             <div className="space-y-1">
              <Label >Mobile Number</Label>
              <Input value={mobile_no} placeholder="9876543219" onChange={(e)=> setMobile_no(e.target.value)} />
            </div>
             <div className="space-y-1">
              <Label >UPI ID</Label>
              <Input value={upi_id}  placeholder="john@exampleupi" onChange={(e)=> setupi_id(e.target.value)} />
            </div>

          </CardContent>
          <CardFooter>
            <Button>PROCEED</Button>
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
              <Input value={name} placeholder="John" onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label >Email</Label>
              <Input value={email} placeholder="john@gmail.com" onChange={(e)=> setEmail(e.target.value)} />
            </div>
             <div className="space-y-1">
              <Label >Mobile Number</Label>
              <Input value={mobile_no} placeholder="9876543219" onChange={(e)=> setMobile_no(e.target.value)} />
            </div>
             <div className="space-y-1">
              <Label >Account Number</Label>
              <Input value={account_no} placeholder="9876543219" onChange={(e)=> setAccount_no(e.target.value)} />
            </div>

         <div className="space-y-1">
              <Label >IFSC CODE</Label>
              <Input value={ifsc_code} placeholder="9876543219" onChange={(e)=> setIfsc_code(e.target.value)} />
            </div>



          </CardContent>
          <CardFooter>
            <Button>PROCEED</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}

