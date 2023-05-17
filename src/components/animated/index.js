// "use client";
// import { motion } from "framer-motion";
// import React from "react";

// const quote = {
//   initial: {
//     opacity: 1,
//   },
//   animate: {
//     opacity: 1,
//     transition: {
//       delay: 0.5,
//       staggerChildren: 0.08,
//     },
//   },
// };

// const singleWord = {
//   initial: {
//     opacity: 0,
//     y: 50,
//   },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 1,
//     },
//   },
// };

// const AnimatedText = ({ text, className = "" }) => {
//   return (
//     <div className="w-full mx-auto flex item-center justify-center overflow-hidden dark:text-light ">
//       <motion.h1
//         className={` inline-block w-full text-dark font-bold text-8xl dark:text-light ${className} `}
//         variants={quote}
//         initial="initial"
//         animate="animate"
//       >
//         {text.split(" ").map((word, index) => {
//           return (
//             <motion.span
//               variants={singleWord}
//               className="inline-block"
//               key={word + "-" + index}
//             >
//               {word}&nbsp;
//             </motion.span>
//           );
//         })}
//       </motion.h1>
//     </div>
//   );
// };

// export default AnimatedText;
