import React, { useState } from "react";
import Logo from "./logo";
import { LogOutUser } from "../auth";
import { ChevronDown } from "react-feather";

const Header = ({ auth }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  return (
    <div className="bg-green-600  w-full p-4 pb-40">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="w-40 ">
          <Logo light={true} />
        </div>

        <div>
          <button
            type="button"
            className="focus:outline-none relative"
            onClick={() => setDropDownOpen(!dropDownOpen)}
          >
            <span className="text-white font-semibold flex items-center">
              {auth.name} <ChevronDown />
            </span>

            <div
              className={`w-64 bg-white rounded-lg p-6 shadow-xl absolute right-0 top-auto ${
                dropDownOpen ? "block" : "hidden"
              }`}
            >
              <span className="text-gray-700">Logged in as {auth.name}</span>
              <button
                type="button"
                className="focus:outline-none  mt-2 bg-red-600 hover:bg-red-700 text-white p-2 w-full rounded-lg"
                onClick={() => LogOutUser()}
              >
                Log Out
              </button>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
