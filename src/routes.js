import React from "react";
import Home from "./home";
import About from "./about";
import { Link, Router } from "@reach/router";

function Routes() {
  return (
    <Router>
      <About path="/about" />
      <Home path="/" />
    </Router>
  );
}

export default Routes;
