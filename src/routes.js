import React, { useState } from "react";
import Home from "./home";
import About from "./about";
import Login from "./login";
import { Link, Router } from "@reach/router";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Map from "./components/map";
import SignUp from "./signup";
import {Helmet} from "react-helmet";


const client = new ApolloClient({
  uri: "https://fooddesk.herokuapp.com/v1/graphql"
});

function Routes() {
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("authuser"))
  );

  if (authenticated) {
    return (
      <ApolloProvider client={client}>
        <Helmet>
            <meta charSet="utf-8" />
            <title>FoodDesk</title>
            <link rel="canonical" href="http://fooddeskapp.com" />
        </Helmet>
        <Router>
          <About path="/about" auth={authenticated} />
          <Home path="/" auth={authenticated} />
          <Home default auth={authenticated} />
          <Map path="/map" auth={authenticated} />
        </Router>
      </ApolloProvider>
    );
  }
  return (
    <ApolloProvider client={client}>
      <Router>
          <Login default />
          <SignUp path="/sign-up" />
        </Router>

    </ApolloProvider>
  );
}

export default Routes;
