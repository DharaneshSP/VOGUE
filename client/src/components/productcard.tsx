import React from 'react'
import Image from 'next/image'
import shoppingcart from '@/../public/addtocart.png'

const sampleproduct={

  name:"cool shirtt",
  img_url1:"https://m.media-amazon.com/images/I/71m-asaoNNL._AC_SX425_.jpg",
  img_url:"https://rukminim2.flixcart.com/image/850/1000/xif0q/trouser/e/s/z/30-tu1-vebnor-original-imagmy6hhhz62qzn.jpeg?q=90&crop=false",
  price:200,
  description:"a nice shirt"

}

const productcard = ({product}) => {

  const backgroundImageStyle = {
    backgroundImage: `url(${product.img_url})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain'
  };

  return (
    <div className="border w-[45vh] border-0  border-gray-800 h-[70vh]">
     <div className={`border border-0 border-black h-[80%] w-full flex justify-center item-center`} style={backgroundImageStyle}>
      </div>
     <div className="border border-0 border-black h-[10%] overflow-x-auto whitespace-nowrap p-2 ">
        <h1 className="font-robotocondensed text-xl">{product.name}</h1>
     </div>
     <div className="font-robotocondensed h-full flex justify-between item-center px-2">
        <div>&#8377; {product.price}</div>
        <div><button><Image src={shoppingcart} height={15} width={15} alt="addtocart"/></button></div>
     </div>
    </div>
  )
}

export default productcard
