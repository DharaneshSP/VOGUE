import React from 'react'

import {Button} from "@/components/ui/button"

const product={

  name:"cool shirtt cool cool coolcool cool",
  img_url1:"https://m.media-amazon.com/images/I/71m-asaoNNL._AC_SX425_.jpg",
  img_url:"https://rukminim2.flixcart.com/image/850/1000/xif0q/trouser/e/s/z/30-tu1-vebnor-original-imagmy6hhhz62qzn.jpeg?q=90&crop=false",
  price:200,
  description:"a nice shirt aaa aa aa aa aa aa aa aaa aa aa aa aa aa aaa aa aa aa aa aa aa aa aa aa aa aa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aa aaa"

}


const page = ({params}) => {

 const backgroundImageStyle = {
    backgroundImage: `url(${product.img_url1})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  };

  return (
    <div className="pt-[12vh]">
    <div className="flex flex-wrap w-full h-full justify-center items-start gap-4 px-2">
       <div className="p-3 max-w-full border w-[58vh] border-[1px]  border-gray-800 h-[60vh] md:h-[70vh] lg:h-[70vh] rounded-lg shadow-lg">
     <div className={`border border-0 border-black h-[100%] w-full flex justify-center item-center`} style={backgroundImageStyle}>
      </div>
  </div>

    <div className="max-w-full border border-[1px] border-black w-full lg:w-[50vw] lg:w-[70vw] px-3 pl-5 pb-2 shadow-lg rounded-lg">

    <div className="py-3 font-medium text-4xl font-lato uppercase">
      {product.name}
    </div>
    <div className="py-3 border-x-gray-50 border-[1px] font-medium font-robotocondensed text-3xl">
      &#8377; {product.price}
    </div>
    <div className="py-3 font-medium font-lato pt-2 uppercase">
        {product.description}
    </div>
    {/* <div className="py-3 border-x-gray-50 border-[1px] font-robotocondensed text-3xl">
      seller : kevin
    </div> */}

    <div className="py-3">
      <Button>Add To Cart</Button> 
    </div>


    </div>

  </div>
    
    </div>
  )
}

export default page
