import React from "react";

const services = () => {
  return (
    <div className="min h-screen flex-col justify-center items-center">
      <div className="border-0 border-green relative">
        <div className="font-lato font-black text-[26vw] text-gray-200 text-center">
          Reliable
        </div>

        <div className="hidden lg:absolute lg:inset-0 lg:flex items-center justify-center lg:transform translate-y-[8%] px-56">
          <div className="font-dancingscript text-center text-lg text-black">
            Buy high-quality products, sell effortlessly, and enjoy secure
            transactions, a user-friendly interface, and dedicated support.
            Discover a diverse selection, benefit from advanced security, and
            join our community of satisfied customers and successful sellers.
          </div>
        </div>
      </div>

      <div className="lg:hidden pt-32 flex items-center justify-center">
        <div className="font-dancingscript text-center text-lg text-black">
          Buy high-quality products, sell effortlessly, and enjoy secure
          transactions, a user-friendly interface, and dedicated customer
          support. Discover a diverse selection, benefit from advanced security
          measures, and join our community of satisfied customers and successful
          sellers.
        </div>
      </div>

      <div className="pt-24 lg:pt-8 flex items-center justify-center font-dancingscript">
        <div>Reliable Shopping</div>
      </div>
    </div>
  );
};

export default services;
