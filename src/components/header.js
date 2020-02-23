import React, {useState} from "react";
import Logo from "./logo";
import { LogOutUser } from "../auth";

const Header = ({ auth }) => {
 
  return (
    <div className="bg-green-600  w-full p-4 pb-40">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="w-40 ">
          <Logo light={true}/>
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
