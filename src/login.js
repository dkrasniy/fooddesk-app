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
    <div className="font-semibold mb-4 my-2 py-2 text-red-600">
      Username or password is incorrect
    </div>
  );

  return (
    <div className="min-h-screen  bg-orange-100">
    <div className="bg-white">
      <div className="container p-4 flex items-center justify-between mx-auto">

    <div className="w-40">
        <Logo />
      </div>
      <div>
       <ul className="flex items-center justify-between">
         <li className="uppercase text-orange-500 px-4">Home</li>
         <li className="uppercase text-orange-500 px-4">About</li>
         <li className="uppercase text-orange-500 px-4">Help</li>
         <li className="uppercase text-orange-500 px-4 pr-0">
           <button type="button" className="px-4 py-2 bg-orange-500 text-white rounded-lg">Log in</button></li>
       
       </ul>
      </div>
      </div>
    </div>
        <Helmet>
            <meta charSet="utf-8" />
            <title>FoodDesk</title>
            <link rel="canonical" href="http://fooddeskapp.com" />
        </Helmet>
        <div className="w-full max-w-xl mx-auto p-6">
        
        <form
          onSubmit={handleSubmit}
          className="mt-8  sm:px-8 sm:py-8"
        >
          <div className="py-4">
          <h2 className="font-semibold text-3xl py-2 Henriette font-bold">Log in</h2>
          <h3 className="text-lg block text-gray-600 ">Thank you for checking back to Skyduling. Let’s see what we matched for you. </h3>
         
          

          </div>
          {invalidLogin ? <WrongUserPass /> : null}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-900 leading-tight"
            >
              Email
            </label>
            <input
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-orange-400"
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
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-orange-400"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div class="mt-4 px-2 text-right">
         </div>
          <div className="text-right underline">
          Forgot passwords?
          </div>
          <button
            type="submit"
            className="mt-6 block w-full px-4 py-3 leading-tight rounded-lg bg-orange-500 hover:bg-orange-400 text-orange-100 font-semibold focus:outline-none"
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
