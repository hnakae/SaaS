"use client";
import React from "react";
import Link from "next/link";
import Logo from "../logo";
import {
  DribbbleIcon,
  GithubIcon,
  LinkedInIcon,
  PinterestIcon,
} from "../icons";

const Footer = () => {
  return (
    <>
      <footer className=" w-full px-12 font-normal text-sm dark:text-light dark:border-light sm:text-base  ">
        <div className="h-[455px] text-dark w-full ">
          <div className="flex justify-around p-12">
            <div className="flex flex-col gap-4">
              <div className="font-bold text-2xl">info@my.agency</div>
              <div className="mb-24">USA, Eugene Oregon</div>
              <div className="flex  gap-5">
                <LinkedInIcon className="lg:w-[30px]" />
                <DribbbleIcon className="lg:w-[30px]" />
                <PinterestIcon className="lg:w-[30px]" />
                <GithubIcon className="lg:w-[30px]" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-bold text-2xl">Company</div>
              <div>Works</div>
              <div>Services</div>
              <div>Industries</div>
              <div>About</div>
              <div>Blog</div>
              <div>Contact Us</div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-bold text-2xl">Services</div>
              <div>Product Strategy</div>
              <div>Business Analysis</div>
              <div>UX Audit</div>
              <div>UI/UX Design</div>
              <div>Web Design</div>
              <div>Brand identity</div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-bold text-2xl">Solutions</div>
              <div>For Business</div>
              <div>For Startups</div>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-between py-4 px-12  ">
          <Logo />
          <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
          <div className="flex items-center lg:py-2">
            Built With
            <span className="text-brand text-2xl px-1 dark:text-primaryDark">
              &#9825;
            </span>
            by&nbsp;
            <Link
              href="/"
              target={"_blank"}
              className="underline underline-offset-2 "
            >
              Hiro Nakae
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
