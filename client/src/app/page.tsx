"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "@/components/emblacarousel";
import HeroNavbar from "@/components/heronavbar";
import Fashion from "@/components/fashion";
import Services from "@/components/services";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 4;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const val = process.env.NEXT_PUBLIC_BACKEND;
console.log(val);

const page = () => {
  return (
    <div>
      <HeroNavbar/>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      <Fashion />
      <div className="min h-screen flex justify-center items-center bg-women bg-fixed bg-no-repeat bg-cover bg-center transition-smooth">
      </div>

      <Services />
      <div className="min h-screen flex justify-center items-center bg-men bg-fixed bg-no-repeat bg-cover bg-center transition-smooth">
      </div>
    </div>
  );
};

export default page;
