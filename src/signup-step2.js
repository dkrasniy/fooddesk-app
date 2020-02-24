import React, { useState } from "react";
import Logo from "./components/logo";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { navigate } from "@reach/router"
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";

const CREATE_PERSONAL_INFO = gql`
  mutation CreatePersonalRecordUser($user_id: Int!, $school: String!,$phone: String!, $insurance: String!) {
    insert_user_personal_info(objects: {user_id: $user_id, school: $school, phone: $phone, insurance: $insurance}) {
      returning {
        id
      }
    }
  }
`;





function Step2({auth}) {
  auth = JSON.parse(localStorage.getItem("authuser"))
  let history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [insurance, setInsurance] = useState("");
  const [school, setSchool] = useState("");


  const [createdUserID,setCreatedUserID] = useState(null);

  const [accountType, setAccountType] = useState(5);

  const [createPersonalRecord, { loadingUser }] = useMutation(CREATE_PERSONAL_INFO, {
    onCompleted: (data) => {
     
      history.push('/')
      window.location.reload(false);
    }
      
  });


  

  const handleSubmit = e => {
    e.preventDefault();
    createPersonalRecord({ variables: { user_id:auth.id, phone: phone, insurance: insurance, school: school } });
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
         <div  className="w-full h-2 flex items-center">
            <span className="w-1/4 h-2 block mx-2 bg-orange-500"></span>
            <span className="w-1/4 h-2 block mx-2 bg-white"></span>
            <span className="w-1/4 h-2 block mx-2 bg-white"></span>
            <span className="w-1/4 h-2 block mx-2 bg-white"></span>
         </div>
         <div className="py-4">
         <h2 className="font-semibold text-3xl py-2 Henriette font-bold">We need to know a little bit about you, {auth.name}.</h2>
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
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none"
              id="name"
              type="text"
              name="name"
              value={auth.name}
            readOnly
            />
          </div>
       
          <div className="mb-4">
            <div className="flex flex-wrap">

              <div className="w-full md:w-1/2 md:pr-2 py-2">
              <label
              htmlFor="phone"
              className="block text-gray-900 leading-tight"
            >
              Phone{" "}
            </label>
            <input
            required
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-orange-400"
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
              </div>
              <div className="w-full md:w-1/2 md:pl-2 py-2">
              <label
              htmlFor="insurance"
              className="block text-gray-900 leading-tight"
            >
              Insurance{" "}
            </label>
            <input
            required
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-orange-400"
              type="text"
              id="insurance"
              name="insurance"
              value={insurance}
              onChange={e => setInsurance(e.target.value)}
            />
              </div>
            </div> </div>

            <div className="my-4">
            <label
              htmlFor="school"
              className="block text-gray-900 leading-tight"
            >
              School
            </label>
            <input
            required
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-orange-400"
              id="school"
              type="text"
              name="school"
              value={school}
              onChange={e => setSchool(e.target.value)}
            />
          </div>
           

         
          <button
            type="submit"
            className="mt-6 block w-full px-4 py-3 leading-tight rounded-lg bg-orange-500 hover:bg-orange-400 text-orange-100 font-semibold focus:outline-none"
          >
            {loadingUser ? "Saving info..." : "Next"}
          </button>
       
        </form>
      </div>
    </div>
  );
}

export default Step2;












