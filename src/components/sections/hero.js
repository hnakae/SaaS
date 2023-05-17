import React from "react";
// import AnimatedText from "../animated";
import Icon from "react-icons-kit";
import { arrow_down } from "react-icons-kit/ikons/arrow_down";

const Hero = () => {
  return (
    <div className=" flex flex-col   bg-brandWhite ">
      <div className="font-medium mb-10">
        Frontend Developer | UI/UX Designer
      </div>
      <div className=" xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl  md:pr-32 lg:pr-32 font-semibold lg:leading-normal md:leading-normal mb-10">
        Hello! I&apos;m Hiro Nakae, a Software Engineer based in Eugene, Oregon.
      </div>
      {/* <AnimatedText
        text="Frontend Developer | UI/UX Designer"
        className=" xs:text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-10"
      />
      <AnimatedText
        text="Hello! I'm Hiro Nakae, a Software Engineer based in Eugene, Oregon."
        className=" xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl  md:pr-32 lg:pr-32 font-semibold lg:leading-normal md:leading-normal mb-10"
      /> */}

      {/* Button */}
      {/* <div className="flex justify-center mb-10">
      <Link
        href="/algo"
        className="font-semibold border sm:rounded-full border-dark flex justify-center w-[180px] items-center py-4  bg-brandWhite hover:bg-brandDark  md:mb-6 md:mt-12 "
      >
        <span className="text-lg font-bold ">Let's Code</span>
        <Image
          src={arrow_right}
          alt="arrow"
          className="w-auto h-4 ml-4 "
        />
      </Link>
    </div> */}
      {/* ARROW INDICATOR */}
      <div className="font-semibold text-xs lg:text-sm flex justify-center md:mt-6 ">
        <div className="cursor-pointer">VIEW FEATURED PROJECT</div>
      </div>
      <div className="flex flex-col justify-center items-center p-4 md:mb-16 lg:mb-20">
        <Icon icon={arrow_down} className="cursor-pointer animate-bounce" />
      </div>
    </div>
  );
};

export default Hero;
