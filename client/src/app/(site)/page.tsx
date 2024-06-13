"use client";

import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "@/components/emblacarousel";
import Navbar from "@/components/navbar";
import Fashion from "@/components/fashion";
import Services from "@/components/services";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 4;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const page = () => {
  return (
    <div>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />

      <Fashion/>
      <div className="min h-screen flex justify-center items-center bg-women bg-fixed bg-no-repeat bg-cover bg-center transition-smooth">
        <h1>parallax</h1>
      </div>

      <Services/>
       <div className="min h-screen flex justify-center items-center bg-men bg-fixed bg-no-repeat bg-cover bg-center transition-smooth">
        <h1>parallax</h1>
      </div>


    </div>
  );
};

export default page;
