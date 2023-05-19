import Image from "next/image";
import hero from "../../../public/hero.png";
import React from "react";
// import AnimatedText from "../animated";
import Icon from "react-icons-kit";
import { arrow_down } from "react-icons-kit/ikons/arrow_down";

const Hero = () => {
  return (
    <div className=" flex flex-col relative w-full">
      <Image
        className="absolute -top-48 z-0"
        src={hero}
        alt="hero img"
        w={1253}
        h={812}
        priority
        as="img"
      />

      <div className=" px-12 pt-40 w-full  xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl  font-semibold leading-normal mb-6">
        <div>Banking for</div>
        <div>what you&apos;re building</div>
      </div>
      <div className="px-12 font-medium mb-10 flex flex-col">
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
          className="py-2 px-2 rounded-md caret-blue-500"
        />
        <button className=" bg-blue-500 hover:bg-blue-600 cursor-pointer px-4 py-2 rounded-3xl text-white">
          Open Account
        </button>
      </div>
    </div>
  );
};

export default Hero;
