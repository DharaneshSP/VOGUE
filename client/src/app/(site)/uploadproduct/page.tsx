"use client";

import axios from "axios";
import React, { useState } from "react";
import { Input } from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {v4 as uuid} from 'uuid'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select"

import {supabase} from "@/utils/supabaseclient"
import {BACKEND,SUPABASE_URL} from '@/utils/constants'


type Category= "Clothing" | "Footwear" | "Accessories" | "Cosmetics" 


const page = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category,setCategory]=useState<Category|null>(null);
  const [tags, setTags] = useState<string[]>([])
  const [img,setimg]=useState<FileList|null>();
  const [newTag, setNewTag] = useState<string>("")

  const handlesubmit = async(e: any) => {
 
    e.preventDefault();
     
     if (!img || img.length === 0) {
      console.log("No image selected");
      return;
    }

    const img_file=img[0]
    const id=uuid();
    
    const producttags=tags.join(" ");

try{
    const { data:img_res, error } = await supabase
  .storage
  .from('products')
  .upload(id,img_file ,{
    cacheControl: '3600',
    upsert: false
  })

  if(error){
      throw error
  }
const img_url=`${SUPABASE_URL}/storage/v1/object/public/${img_res.fullPath}`

    console.log(img_res,error,img_url);

    const accessToken = localStorage.getItem("accessToken");
    const data = {
      id:id,
      name: name,
      description: description,
      price: price,
      tags:producttags,
      img_url:img_url,
      category:category,
      accessToken: accessToken,
    };

    
    axios
      .post(
        `${BACKEND}/product/upload-product`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => console.log("Done"))
      .catch(() => console.log("Not Uploaded"));
    }
    catch(err){
       console.log("Error Occurred") 
    }

  };

   const addTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }
  const removeTag = (index:number) => {
    const updatedTags = [...tags]
    updatedTags.splice(index, 1)
    setTags(updatedTags)
  }

  return (
    <div className="h-screen border border-black flex justify-center items-center">
      <form
        className="pt-[15vh] px-5 flex flex-col max-w-96 min-w-56 gap-2 w-1/2 h-screen overflow-y-scroll"
        onSubmit={handlesubmit}
      >
        <Label>Product Name</Label>
        <Input
          className="p-3 border border-black  rounded focus:outline-none"
          type="text"
          placeholder="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <Label>Product Description</Label>
        <textarea
          className="p-3 border border-black min-h-20 rounded focus:outline-none"
          placeholder="description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />

        <Label>Product Price</Label>
        <Input
          className="p-3 border border-black  rounded focus:outline-none"
          type="number"
          placeholder="price"
          value={price}
          required
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />
                <Label>Product Category</Label>
        <Select required onValueChange={(value)=>setCategory(value as Category)} >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
          <SelectGroup>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Footwear">Footwear</SelectItem>
            <SelectItem value="Accessories">Accessories</SelectItem>
            <SelectItem value="Cosmetics">Cosmetics</SelectItem>
           </SelectGroup> 
          </SelectContent>
        </Select>

        <Label>Product's Image</Label>
        <Input
          type="file"
          placeholder="product image"
          className="min-h-8"
          accept=".png, .jpg, .jpeg"
          onChange={(e)=> setimg(e.target.files)}
          required
        />
        
          <Label>Product's Tags</Label>
         <Input
          type="text"
          placeholder="Enter a tags"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTag()
            }
          }}
          className="flex-1"
        />
        <Button type="button" onClick={addTag}>Add</Button>
        <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center space-x-2"
          >
            <span>{tag}</span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeTag(index)}
              className="text-primary-foreground hover:bg-primary/20"
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>


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


function XIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
