import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

// const MotionLink = motion(Link);

const Logo = () => {
  return (
    <div className="flex items-center justify-center ">
      <Link href="/">HiroNakae</Link>
    </div>
    // <div className="flex items-center justify-center ">
    //   <MotionLink
    //     href="/"
    //     className="xs:w-8 xs:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:landscape:pl-5 lg:h-10 md:bg-dark flex items-center justify-center rounded-full text-sm lg:text-2xl lg:text-dark md:text-light font-bold border border-solid border-transparent dark:border-light"
    //     whileHover={{
    //       backgroundColor: [
    //         "#121212",
    //         "rgba(131,58,180,1)",
    //         "rgba(253,29,29,1)",
    //         "rgba(252,176,69,1)",
    //         "rgba(131,58,180,1)",
    //         "#121212",
    //       ],
    //       transition: { duration: 1, repeat: Infinity },
    //     }}
    //   >
    //     <span className="md:block lg:hidden">HN</span>
    //     <span className="md:hidden">HiroNakae</span>
    //   </MotionLink>
    // </div>
  );
};

export default Logo;
