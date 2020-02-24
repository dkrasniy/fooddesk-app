import React, { useState } from "react";
import Logo from "./components/logo";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { navigate } from "@reach/router"
import { useMutation } from '@apollo/react-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import { useHistory } from "react-router-dom";


const CREATE_USER = gql`
  mutation CreateUser($name: String!, $password: String!,$email: String!, $type: Int!) {
    insert_user(objects: {name: $name, password: $password, email: $email, type: $type}) {
      returning {
        id
        email
        name
        type
      }
    }
  }
`;


const CREATE_RESTARAUNT = gql`
  mutation CreateRestaraunt($name: String!, $description: String!,$address: String!) {
    insert_restaurant(objects: {address: $address, description: $description, name: $name}) {
      returning {
        id
      }
    }
  }
`;

const UPDATE_USER_RESTAURANT = gql`
  mutation updateUserRestaurantInfo($restaurantId: Int!, $userId: Int!) {
    update_user(_set: {restaurant_id: $restaurantId}, where: {id: {_eq: $userId}}) {
      affected_rows
      returning {
        name
        restaurant_id
      }
    }
  }
`;




function Login() {
  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createdUserID,setCreatedUserID] = useState(null);

  const [accountType, setAccountType] = useState(5);

  const [createUser, { loadingUser }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      localStorage.setItem("authuser", JSON.stringify(data.insert_user.returning[0]));
      history.push('/sign-up-2')

    }
      
  });


  

  const handleSubmit = e => {
    e.preventDefault();
    createUser({ variables: { name:name, email: email, password: password, type: accountType } });
    
  };







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


<div className="w-full max-w-xl mx-auto p-6">
       
       <form
         onSubmit={handleSubmit}
         className="mt-8  sm:px-8 sm:py-8"
       >
         <div className="py-4">
         <h2 className="font-semibold text-3xl py-2 Henriette font-bold">Create an account to start</h2>
         <h3 className="text-lg block text-gray-600 ">So we can better match you with the therapist based on your insurance.</h3>
         </div>
         <div className="my-4">
            <label
              htmlFor="name"
              className="block text-gray-900 leading-tight"
            >
              Name
            </label>
            <input
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-orange-400"
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
         <div className="my-4">
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
            <div className="flex flex-wrap">

              <div className="w-full md:w-1/2 md:pr-2 py-2">
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
              <div className="w-full md:w-1/2 md:pl-2 py-2">
              <label
              htmlFor="password"
              className="block text-gray-900 leading-tight"
            >
              Confirm Password{" "}
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
            </div> </div>
           

         
          <button
            type="submit"
            className="mt-6 block w-full px-4 py-3 leading-tight rounded-lg bg-orange-500 hover:bg-orange-400 text-orange-100 font-semibold focus:outline-none"
          >
            {loadingUser ? "Creating account..." : "Next"}
          </button>
          <Link
            type="button"
            to="/"
            
            className="mt-3  text-center block w-full px-4 py-2 leading-tight rounded-full  text-gray-700 focus:outline-none"
          >
         Have an acccount? Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;












