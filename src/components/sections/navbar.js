"use client";
import { useEffect, useState } from "react";
import Logo from "../logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
useRouter;
import useThemeSwitcher from "../hooks/useThemeSwitcher";
import { LoginButton, LogoutButton } from "../../app/auth";
import { SunIcon, MoonIcon } from "../icons";
import { Switch } from "../ui/switch";
const Navbar = ({ session }) => {
  const [mode, setMode] = useThemeSwitcher();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  // useEffect(() => {
  //   if (session) {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //   }
  // }, [session, loggedIn]);
  return (
    <header className=" z-10 h-[64px]  bg-opaque backdrop-blur-md w-full px-12 md:py-7 lg:py-8 font-medium flex text-dark items-center justify-between dark:text-light  fixed ">
      <div className="w-full flex justify-between items-center">
        <Logo />
        <nav className="space-x-6">
          {/* <Link href="/dashboard">Profile</Link> */}

          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/getplus" className=" rounded-sm p-2">
            Premium
          </Link>

          {/* <Switch
            className="z-30"
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
          /> */}

          <button
            className="flex-col justify-center items-center  z-20 "
            onClick={handleClick}
          >
            <span
              className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
              }`}
            ></span>
            <span
              className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
              }`}
            ></span>
          </button>
        </nav>
      </div>
      {isOpen ? (
        <div className="min-w-[70vw] z-30 flex justify-around items-center fixed top-72 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32">
          <nav className="flex items-center flex-col justify-center space-y-4">
            <Link href="/" className="text-light">
              Home
            </Link>
            <Link href="/dashboard" className="text-light">
              Dashboard
            </Link>
            <Link href="/guides" className="text-light">
              Guides
            </Link>
            <Link href="/courses" className="text-light">
              Courses
            </Link>
            <Link href="/tierlist" className="text-light">
              Tier List
            </Link>
          </nav>

          <nav className="flex flex-col items-center justify-center flex-wrap mt-2">
            <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className={`w-6 sm:mx-1 ml-3 flex items-center justify-center rounded-full p-1 mb-8
  ${mode === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
            >
              {mode === "dark" ? (
                <SunIcon className={"fill-dark"} />
              ) : (
                <MoonIcon className={"fill-dark"} />
              )}
            </button>
            <div className="text-light/50 dark:text-dark/50">Follow us</div>
            <Link href="/" className="text-light">
              Linkedin
            </Link>
            <div className="text-light/50 dark:text-dark/50 mt-8">
              Get in touch
            </div>
            <Link href="/" className="text-light">
              info@my.agency
            </Link>
            <div></div>
          </nav>
        </div>
      ) : null}
    </header>
  );
};
export default Navbar;
// import React, { useState } from "react";
// import Link from "next/link";
// import Logo from "../logo";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import {
//   TwitterIcon,
//   GithubIcon,
//   LinkedInIcon,
//   PinterestIcon,
//   DribbbleIcon,
//   SunIcon,
//   MoonIcon,
// } from "../icons";
// import useThemeSwitcher from "../hooks/useThemeSwitcher";

// const CustomLink = ({ href, title, className = "" }) => {
//   const router = useRouter();
//   return (
//     <>
//       <Link href={href} className={`${className} relative group sm:hidden`}>
//         {title}

//         <span
//           className={`h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 dark:bg-light
//           ${router.asPath === href ? "w-full" : "w-0"}`}
//         >
//           &nbsp;
//         </span>
//       </Link>
//     </>
//   );
// };
// const CustomMobileLink = ({ href, title, className = "", toggle }) => {
//   const router = useRouter();
//   const handleClick = () => {
//     toggle();
//     router.push(href);
//   };
//   return (
//     <>
//       <button
//         href={href}
//         className={`${className} relative group text-light dark:text-dark my-2`}
//         onClick={handleClick}
//       >
//         {title}

//         <span
//           className={`h-[1px] inline-block bg-light dark:bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300
//           ${router.asPath === href ? "w-full" : "w-0"}`}
//         >
//           &nbsp;
//         </span>
//       </button>
//     </>
//   );
// };

// const Navbar = () => {
//   const [mode, setMode] = useThemeSwitcher();
// const [isOpen, setIsOpen] = useState(false);
// const handleClick = () => {
//   setIsOpen(!isOpen);
// };
//   return (
//     <header className=" z-10 bg-brandWhite w-full h-auto xs:px-4 xs:py-5 sm:px-8 sm:py-6 md:px-12 md:py-7 lg:px-36 lg:py-8 font-medium flex text-dark items-center justify-between dark:text-light   absolute ">
//       {/* desktop */}
//       <div className="w-full flex justify-between items-center">
//         {/* <div className="absolute left-[50%] top-2 translate-x-[-50%] "> */}
//         <Logo />
//         {/* </div> */}
//         <nav>
//           {/* <CustomLink href="/works" title="Case Studies" className="mr-4" /> */}
//           {/* <CustomLink href="/about" title="About" className="mx-4" /> */}
//           {/* <CustomLink href="/blog" title="Blog" className="mx-4" /> */}
//           <CustomLink href="/algo" title="Algo" className="mx-4" />
// <CustomLink
//   href="/contact"
//   title="Contact us"
//   className="mx-4 border border-dark p-4 dark:border-light hover:bg-black hover:text-brandWhite dark:hover:bg-brandDark"
// />

// <button
//   className="flex-col justify-center items-center ml-4 "
//   onClick={handleClick}
// >
//   <span
//     className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
//       isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
//     }`}
//   ></span>
//   <span
//     className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
//       isOpen ? "opacity-0" : "opacity-100"
//     }`}
//   ></span>
//   <span
//     className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
//       isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
//     }`}
//   ></span>
// </button>
//         </nav>
//       </div>
//       {/* mobile */}
//     {isOpen ? (
//       <motion.div
//         initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="min-w-[70vw] z-30 flex justify-around items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32"
//       >
//         <nav className="flex items-center flex-col justify-center">
//           {/* <Logo /> */}
//           {/* <CustomMobileLink
//             href="/works"
//             title="Works"
//             className=""
//             toggle={handleClick}
//           />

//           <CustomMobileLink
//             href="/about"
//             title="About"
//             className=""
//             toggle={handleClick}
//           />
//           <CustomMobileLink
//             href="/blog"
//             title="Blog"
//             className=""
//             toggle={handleClick}
//           /> */}
//           <CustomMobileLink
//             href="/contact"
//             title="Contact"
//             className=""
//             toggle={handleClick}
//           />
//         </nav>

//         <nav className="flex flex-col items-center justify-center flex-wrap mt-2">
//           <button
//             onClick={() => setMode(mode === "light" ? "dark" : "light")}
//             className={`w-6 sm:mx-1 ml-3 flex items-center justify-center rounded-full p-1 mb-8
// ${mode === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
//           >
//             {mode === "dark" ? (
//               <SunIcon className={"fill-dark"} />
//             ) : (
//               <MoonIcon className={"fill-dark"} />
//             )}
//           </button>
//           <div className="text-light/50 dark:text-dark/50">Follow us</div>
//           <CustomMobileLink
//             href="/contact"
//             title="Linkedin"
//             className=""
//             toggle={handleClick}
//           />
//           <div className="text-light/50 dark:text-dark/50 mt-8">
//             Get in touch
//           </div>
//           <CustomMobileLink
//             href="/contact"
//             title="info@my.agency"
//             className=""
//             toggle={handleClick}
//           />
//           <div></div>
//         </nav>
//       </motion.div>
//     ) : null}
//     </header>
//   );
// };

// export default Navbar;
//--------------------------------------------------------------
// "use client";

// import * as React from "react";
// import Link from "next/link";

// import { cn } from "@/lib/utils";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
// // import { Icons } from "@/components/icons";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ];

// export function Navbar() {
//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         <NavigationMenuItem className="relative">
//           <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//               <li className="row-span-3">
//                 <NavigationMenuLink asChild>
//                   <a
//                     className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                     href="/"
//                   >
//                     {/* <Icons.logo className="h-6 w-6" /> */}
//                     <div className="mb-2 mt-4 text-lg font-medium">
//                       shadcn/ui
//                     </div>
//                     <p className="text-sm leading-tight text-muted-foreground">
//                       Beautifully designed components built with Radix UI and
//                       Tailwind CSS.
//                     </p>
//                   </a>
//                 </NavigationMenuLink>
//               </li>
//               <ListItem href="/docs" title="Introduction">
//                 Re-usable components built using Radix UI and Tailwind CSS.
//               </ListItem>
//               <ListItem href="/docs/installation" title="Installation">
//                 How to install dependencies and structure your app.
//               </ListItem>
//               <ListItem href="/docs/primitives/typography" title="Typography">
//                 Styles for headings, paragraphs, lists...etc
//               </ListItem>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Components</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//               {components.map((component) => (
//                 <ListItem
//                   key={component.title}
//                   title={component.title}
//                   href={component.href}
//                 >
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <Link href="/docs" legacyBehavior passHref>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               Documentation
//             </NavigationMenuLink>
//           </Link>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// }

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";
