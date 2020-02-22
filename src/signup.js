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


  const [user, setUser] = useState(null);
  const [getUser, { loading, data }] = useLazyQuery(GET_USER);

  if (loading) return <p>Loading ...</p>;

  if (data && data.user && data.user[0]) {
    localStorage.setItem('authuser',JSON.stringify(data.user[0]));
    console.log(data.user[0])
  }
  

  const handleSubmit = e => {
    e.preventDefault();
    getUser({ variables: { email: email, password: password } })    
  };

  return (
    <div>
  

      <div className="max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="py-8 text-left shadow bg-white rounded"
        >
          <label className="block w-full">
            Email
            <input
              className="block rounded text-gray-900 p-3 w-full border-2"
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <label className="block w-full">
            Password
            <input
              className="block rounded text-gray-900 p-3 w-full border-2"
              type="text"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
