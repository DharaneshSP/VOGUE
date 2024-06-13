import React from "react";

const fashion = () => {
  return (
    <div className="min h-screen flex-col justify-center items-center">
      <div className="border border-20 border-green relative">
        <div className="font-lato font-black text-[26vw] text-gray-200 text-center">
          Fashion
        </div>

        <div className="hidden lg:absolute lg:inset-0 lg:flex items-center justify-center lg:transform translate-y-[8%] px-56">
          <div className="font-dancingscript text-center text-lg text-black">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui
            minim labore adipisicing minim sint cillum sint consectetur
            cupidatat.
          </div>
        </div>
      </div>

      <div className="lg:hidden pt-32 flex items-center justify-center">
        <div className="font-dancingscript text-center text-lg text-black">
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui
          minim labore adipisicing minim sint cillum sint consectetur cupidatat.
        </div>
      </div>

      <div className="pt-24 lg:pt-8 flex items-center justify-center">
        <div>View Products</div>
      </div>
    </div>
  );
};

export default fashion;
