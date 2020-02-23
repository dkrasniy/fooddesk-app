import React from "react";
import Header from "./header";
import Logo from "./logo";

const Layout = ({ auth, children }) => {
  return (
    <div className="h-screen flex">
      <div className="fixed z-30 inset-y-0 left-0 w-64 px-8 py-4 bg-gray-100 border-r overflow-auto lg:static lg:inset-auto lg:translate-x-0 -translate-x-full ease-in transition-medium">
        <Header auth={auth} />
      </div>
      <div className="flex-1 min-w-0 flex flex-col bg-white">
        <main>{children}</main>
      </div>{" "}
    </div>
  );
};

export default Layout;
