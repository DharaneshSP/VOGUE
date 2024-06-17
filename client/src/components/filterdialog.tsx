"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useProductStore } from "@/utils/store";
import { products } from "@/utils/products";

const FilterDialog = () => {
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All");
  const [rating, setRating] = useState("All");

  const { currproducts, setcurrProducts } = useProductStore();
  const [originalProducts, setOriginalProducts] = useState([]);
  const [done, setdone] = useState<Boolean>(false);

  useEffect(() => {
    if (done == false && currproducts.length > 0) {
      setOriginalProducts(currproducts);
      setdone(true);
    }
  }, [currproducts]);

  const filterlist = () => {
    const check = (product) => {
      let pricelimit = { "0": 199, "200": 499, "500": 999, "1000": 9999999 };
      let ratelimit = { "2": 2.9, "3": 3.9, "4": 4.9, "5": 5 };

      return (
        (category == "All" || product.category == category) &&
        (price == "All" ||
          (product.price >= parseInt(price) &&
            product.price <= pricelimit[price])) &&
        (rating == "All" ||
          (product.rating >= parseInt(rating) &&
            product.rating <= ratelimit[rating]))
      );
    };

    const filteredproducts = originalProducts.filter((product) =>
      check(product),
    );
    setcurrProducts(filteredproducts);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-lg px-4 py-2">
            <FilterIcon className="w-5 h-5 mr-2" />
            Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-around items-center pt-4">
          <section>
            <Label>Category</Label>
            <RadioGroup
              className="pt-2"
              value={category}
              onValueChange={handleCategoryChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="All" id="category-all" />
                <Label htmlFor="category-all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Clothing" id="category-clothing" />
                <Label htmlFor="category-clothing">Clothing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Footwear" id="category-footwear" />
                <Label htmlFor="category-footwear">Footwear</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Accessories" id="category-accessories" />
                <Label htmlFor="category-accessories">Accessories</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Cosmetics" id="category-cosmetics" />
                <Label htmlFor="category-cosmetics">Cosmetics</Label>
              </div>
            </RadioGroup>
          </section>

          <section>
            <Label>Price</Label>
            <RadioGroup
              className="pt-2"
              value={price}
              onValueChange={handlePriceChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="All" id="price-all" />
                <Label htmlFor="price-all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="price-199" />
                <Label htmlFor="price-199">0-199</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="200" id="price-499" />
                <Label htmlFor="price-499">200-499</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="500" id="price-999" />
                <Label htmlFor="price-999">500-999</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1000" id="price-1000" />
                <Label htmlFor="price-1000">&#8805;1000</Label>
              </div>
            </RadioGroup>
          </section>

          <section>
            <Label>Rating</Label>
            <RadioGroup
              disabled
              className="pt-2"
              value={rating}
              onValueChange={handleRatingChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="All" id="rating-all" />
                <Label htmlFor="rating-all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="rating-2" />
                <Label htmlFor="rating-2">2 - 2.9</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="rating-3" />
                <Label htmlFor="rating-3">3 - 3.9</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="rating-4" />
                <Label htmlFor="rating-4">4 - 4.9</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="rating-5" />
                <Label htmlFor="rating-5">5</Label>
              </div>
            </RadioGroup>
          </section>
        </div>
        <DialogClose asChild>
          <Button type="button" onClick={filterlist} variant="secondary">
            Filter
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;


function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

