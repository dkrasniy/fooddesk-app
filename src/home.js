import React from "react";
import logo from "./logo.svg";
import { ChevronRight } from "react-feather";
import { Link, Router } from "@reach/router";
import { LogOutUser } from "./auth";
import Layout from "./components/layout";

function Home({ auth }) {
  console.log(auth);
  return (
    <Layout auth={auth}>
      <div className="p-12">
        <h1 className="text-lg md:text-4xl text-bold">Home</h1>

      </div>
    </Layout>
  );
}

export default Home;
