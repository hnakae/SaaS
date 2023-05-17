import React from "react";

const Layout = ({ children, className = "" }) => {
  return (
    <div className={`text-dark w-full h-full ${className}`}>{children}</div>
  );
};

export default Layout;
