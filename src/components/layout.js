import React from "react";
import Header from "./header";
import Logo from "./logo";

const Layout = ({ auth, children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header auth={auth} />
      <div className="max-w-6xl mx-auto">
        <main>{children}</main>
      </div>
     
    </div>
  );
};

export default Layout;
