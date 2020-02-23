import React, { useState } from "react";
import Logo from "./components/logo";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { navigate } from "@reach/router"
import {Helmet} from "react-helmet";

const GET_USER = gql`
  query User($email: String!, $password: String!) {
    user(where: { email: { _eq: $email }, password: { _eq: $password } }) {
      id
      email
      name
      type
    }
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);

  const [getUser, { loading, data }] = useLazyQuery(GET_USER, {
    onCompleted: () => (data.user.length < 1 ? setInvalidLogin(true) : null)
  });

  if (data && data.user && data.user[0]) {
    setInvalidLogin(false);
    localStorage.setItem("authuser", JSON.stringify(data.user[0]));
    window.location.reload(false);
  }

  const handleSubmit = e => {
    e.preventDefault();
    getUser({ variables: { email: email, password: password } });
  };

  const WrongUserPass = () => (
    <div className="bg-red-100 rounded text-red-600 font-semibold mb-4 p-4 py-2 my-2">
      Username or password is incorrect
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-100 py-8">
        <Helmet>
            <meta charSet="utf-8" />
            <title>FoodDesk</title>
            <link rel="canonical" href="http://fooddeskapp.com" />
        </Helmet>
      <div className="-mt-8 w-full max-w-md mx-auto px-6">
        <div className="w-64 mb-4 text-center mx-auto">
          <Logo />
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 sm:bg-white sm:rounded-lg sm:shadow-md sm:px-8 sm:py-8"
        >
          <h2 className="font-semibold text-2xl mb-4">Sign In</h2>
          {invalidLogin ? <WrongUserPass /> : null}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-900 leading-tight"
            >
              Email
            </label>
            <input
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-green-400"
              id="email"
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-900 leading-tight"
            >
              Password{" "}
            </label>
            <input
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-green-400"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div class="mt-4 px-2 text-right">
         </div>
          <button
            type="submit"
            className="mt-6 block w-full px-4 py-3 leading-tight rounded-full bg-green-500 hover:bg-green-700 text-white font-semibold focus:outline-none"
          >
            {loading ? "Signing you in" : "Sign in"}
          </button>
          <button
            type="button"
            onClick={()=>navigate(`/sign-up`)}
            className="mt-3 block w-full px-4 py-2 leading-tight rounded-full  text-gray-700 focus:outline-none"
          >
          Create an account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
