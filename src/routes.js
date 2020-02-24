import React, { useState } from "react";
import Home from "./home";
import About from "./about";
import Login from "./login";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Map from "./components/map";
import SignUp from "./signup";
import { Helmet } from "react-helmet";
import Step2 from "./signup-step2";
import Step3 from "./signup-step3";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const client = new ApolloClient({
  uri: "https://fooddesk.herokuapp.com/v1/graphql"
});

function Routes() {
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("authuser"))
  );

  if (authenticated) {
    console.log('authed')
    return (
      <ApolloProvider client={client}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Skyduling</title>
          <link rel="canonical" href="http://fooddeskapp.com" />
        </Helmet>
        <Router>

          <Switch>
            <Route exact path="/about" >
              <About auth={authenticated} />
            </Route>
            <Route exact path="/">
              <Home auth={authenticated} />
            </Route>

            <Route exact path="/sign-up-2">
              <Step2 auth={authenticated} />
            </Route>
            <Route exact path="/sign-up-3">
              <Step3 auth={authenticated} />
            </Route>

            <Route >
              <Home auth={authenticated} />
            </Route>
            <Route component={Home} />
          </Switch>



        </Router>
      </ApolloProvider>
    );
  }
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/sign-up" >
            <SignUp />
          </Route>
          <Route exact path="/sign-up-2">
              <Step2 auth={authenticated} />
            </Route>

          <Route component={Login} />
        </Switch>
      </Router>

    </ApolloProvider>
  );
}

export default Routes;
