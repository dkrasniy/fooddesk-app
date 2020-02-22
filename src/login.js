import React, { useState } from "react";
import logo from "./logo.svg";
import { ChevronRight } from "react-feather";
import { Link, Router } from "@reach/router";

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useLazyQuery } from '@apollo/react-hooks';


const GET_USER = gql`
query User($email: String!,$password: String!)  { 
  user(where: {email: {_eq: $email}, password: {_eq: $password}}) {
    id
    email
    name
  }
}
`;


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);

  const [getUser, { loading, data }] = useLazyQuery(GET_USER, {
    onCompleted: () => (data.user.length < 1 ? setInvalidLogin(true): null)
  });



  if (data && data.user && data.user[0]) {
    setInvalidLogin(false)
    localStorage.setItem('authuser',JSON.stringify(data.user[0]));
    window.location.reload(false);
  }
  
  

  const handleSubmit = e => {
    e.preventDefault();
    getUser({ variables: { email: email, password: password } })    
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-100 py-8">

  

      <div className="-mt-8 w-full max-w-md mx-auto px-6">
        <div className="w-64 mb-4 text-center mx-auto">
          logo
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 sm:bg-white sm:rounded-lg sm:shadow-md sm:px-8 sm:py-8"
        >
          <h2 className="font-semibold text-2xl mb-4">Sign In</h2>
          {invalidLogin ? "wrong username or password": null}
          <div className="mb-4">
          <label htmlFor="email" className="block text-gray-900 leading-tight">
            Email</label>
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
          <label htmlFor="password" className="block text-gray-900 leading-tight">
            Password </label>
          <input
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-green-400"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="block w-full px-4 py-3 leading-tight rounded-lg bg-green-500 hover:bg-green-700 text-white font-semibold focus:outline-none">{loading ? 'Signing you in': "Sign in"}</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
