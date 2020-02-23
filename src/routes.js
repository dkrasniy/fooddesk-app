import React, { useState } from "react";
import Home from "./home";
import About from "./about";
import Login from "./login";
import { Link, Router } from "@reach/router";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Map from "./components/map";
import SignUp from "./signup";
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
