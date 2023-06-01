import Image from "next/image";
import hero from "../../../public/hero.png";
import React from "react";

const Hero = () => {
  return (
    <div className=" flex flex-col relative w-full">
      <Image
        className="absolute -top-48 right-0 z-0"
        src={hero}
        alt="hero img"
        w={1253}
        h={812}
        priority
        as="img"
      />

      <div className=" px-12 pt-40 w-full  text-7xl  font-normal tracking-tighter mb-6 opacity-80">
        <div>Banking for</div>
        <div>what you&apos;re building</div>
      </div>
      <div className="px-12 font-normal mb-10 flex flex-col opacity-70 text-lg tracking-tight">
        <div>
          Startups of all sizes rely on Mercury as they create the next great
          companies.
        </div>
        <div>Apply in 10 minutes to try business banking as it should be.</div>
      </div>
      <div className="flex px-12 space-x-4 z-20">
        <input
          placeholder="Enter your email"
          type="text"
          className="py-2 px-4 rounded-md placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
        />
        <button className=" bg-blue-500 hover:bg-blue-600 cursor-pointer px-4 py-2 rounded-3xl text-white ">
          Open Account Login/Logout
        </button>
      </div>
    </div>
  );
};

export default Hero;
