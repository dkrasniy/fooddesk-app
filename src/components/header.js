import React from "react";
import Logo from "./logo";
import { LogOutUser } from "../auth";

const Header = ({ auth }) => {
  console.log(auth.type);
  return (
    <div className="bg-white shadow-lg relative w-full p-4 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="w-40 p-4">
          <Logo />
        </div>

        <div>
          <span className="text-gray-700 text-sm text-center">
            Logged in as {auth.name}
          </span>
          <button
            type="button"
            className="bg-white p-2 w-full rounded-lg"
            onClick={() => LogOutUser()}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
