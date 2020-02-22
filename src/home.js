import React from 'react';
import logo from './logo.svg';
import { ChevronRight } from 'react-feather';
import { Link, Router } from "@reach/router";
import {LogOutUser} from './auth'

function Home({auth}) {
  console.log(auth)
  return (
    <div className="App bg-gray-800 text-center min-h-screen items-center flex justify-around">
      <div>
        <img src={logo} className="w-64 mx-auto" alt="logo" />
        <p className="text-white text-semibold text-lg">
      {auth.name}
      <button type="button" onClick={()=>LogOutUser()}>Log Out</button>
        </p>
        <Link className="text-gray-500 block" to="/about">by Louis &amp; David <ChevronRight width={18} className="inline"/></Link>
        </div>
    </div>
  );
}

export default Home;
