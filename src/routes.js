import React from "react";
import Home from "./home";
import About from "./about";
import Login from './login'
import { Link, Router } from "@reach/router";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo"

const client = new ApolloClient({
  uri: "https://fooddesk.herokuapp.com/v1/graphql",
  
});


function Routes() {
  
  return (
    <ApolloProvider client={client}>
    <Router>
      <About path="/about" />
      <Home path="/home" />
      <Login path="/" />
    </Router>
    </ApolloProvider>
  );
}

export default Routes;
