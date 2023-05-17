"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button
      // className="bg-white rounded-md shadow-md px-4 py-2"
      className=""
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      // className="bg-white  px-4 py-2 rounded-md shadow-md"
      className=""
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
};
