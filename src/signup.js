import React, { useState } from "react";
import Logo from "./components/logo";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { navigate } from "@reach/router"
import { useMutation } from '@apollo/react-hooks';



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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");

  const [createdUserID,setCreatedUserID] = useState(null);

  const [accountType, setAccountType] = useState(4);

  const [createUser, { loadingUser }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      localStorage.setItem("authuser", JSON.stringify(data.insert_user.returning[0]));
      setCreatedUserID(data.insert_user.returning[0].id)
      
      if(accountType==1){
        createRestaraunt({ variables: { name:restaurantName, description: restaurantDescription, address: restaurantAddress } });
      } else {
        window.location.reload(false);
      }
    
    }
      
  });

  const [updateUserRestaurantInfo, { loadingSetLink }] = useMutation(UPDATE_USER_RESTAURANT, {
    onCompleted: (data) => { window.location.reload(false)}
  });


  const [createRestaraunt, { loadingCreateRestaraunt, data }] = useMutation(CREATE_RESTARAUNT, {
    onCompleted: (data) => {
      updateUserRestaurantInfo({ variables: { restaurantId: data.insert_restaurant.returning[0].id, userId: createdUserID } })
    }
  });

  
  

  const handleSubmit = e => {
    e.preventDefault();
    createUser({ variables: { name:name, email: email, password: password, type: accountType } });
    
    
  };



  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-100 py-8">
      <div className="-mt-8 w-full max-w-md mx-auto px-6">
        <div className="w-64 mb-4 text-center mx-auto">
          <Logo />
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 sm:bg-white sm:rounded-lg sm:shadow-md sm:px-8 sm:py-8"
        >
          <h2 className="font-semibold text-2xl mb-4">Create an account</h2>

          <div class="my-4">
          <span class="text-gray-700">Account Type</span>
          <div class="mt-2">
          <label htmlFor="type2" class="inline-flex items-center" >
              <input required id="type2" type="radio" class="form-radio" name="accountType" checked={accountType == 4} value="4" onChange={(e)=>setAccountType(e.target.value)}/>
              <span class="ml-2">Distributor</span>
            </label>
            <label htmlFor="type1" class="inline-flex items-center ml-6">
              <input required id="type1" type="radio" class="form-radio" name="accountType" checked={accountType == 1} value="1" onChange={(e)=>setAccountType(e.target.value)}/>
              <span class="ml-2">Restaurant</span>
            </label>
            
          </div>
        </div>


          <span class="text-gray-700 mb-2 block">Personal Details</span>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-900 leading-tight"
            >
              Name
            </label>
            <input required
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-green-400"
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-900 leading-tight"
            >
              Email
            </label>
            <input required
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
            <input required
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

         {accountType == 1 ? <>
          <hr/>
          <span class="text-gray-700 mt-4 mb-2 block">Restaurant Details</span>
          <div className="mb-4">
            <label
              htmlFor="restaurantName"
              className="block text-gray-900 leading-tight"
            >
              Restaurant Name
            </label>
            <input required
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-green-400"
              id="restaurantName"
              type="text"
              name="restaurantName"
              value={restaurantName}
              onChange={e => setRestaurantName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="restaurantDescription"
              className="block text-gray-900 leading-tight"
            >
              Restaurant Description
            </label>
            <input required
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-green-400"
              id="restaurantDescription"
              type="text"
              name="restaurantDescription"
              value={restaurantDescription}
              onChange={e => setRestaurantDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="restaurantAddress"
              className="block text-gray-900 leading-tight"
            >
              Restaurant Address
            </label>
            <input required
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-green-400"
              id="restaurantAddress"
              type="text"
              name="restaurantAddress"
              value={restaurantAddress}
              onChange={e => setRestaurantAddress(e.target.value)}
            />
          </div>
         
         </> : null}
       
         
          <button
            type="submit"
            className="mt-6 block w-full px-4 py-3 leading-tight rounded-full bg-green-500 hover:bg-green-700 text-white font-semibold focus:outline-none"
          >
            {loadingUser || loadingCreateRestaraunt || loadingSetLink ? "Creating account..." : "Complete Signup"}
          </button>
          <button
            type="button"
            onClick={()=>navigate(`/`)}
            className="mt-3 block w-full px-4 py-2 leading-tight rounded-full  text-gray-700 focus:outline-none"
          >
         Have an acccount? Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
