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
      <span className="text-xs text-center block text-gray-600 p-12">Built at SacHacks 2020 by David &amp; Louis</span>
    </div>
  );
};

export default Layout;
