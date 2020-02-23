import React, { useState } from "react";
import Logo from "./components/logo";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { navigate } from "@reach/router"
import { useMutation } from '@apollo/react-hooks';


const CREATE_PERSONAL_INFO = gql`
  mutation CreatePersonalRecordUser($user_id: Int!, $school: String!,$phone: String!, $insurance: String!) {
    insert_user_personal_info(objects: {user_id: $user_id, school: $school, phone: $phone, insurance: $insurance}) {
      returning {
        id
      }
    }
  }
`;





function Step3({auth}) {
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
     
      navigate(`/sign-up-3`)
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
            <span className="w-1/4 h-2 block mx-2 bg-orange-500"></span>
            <span className="w-1/4 h-2 block mx-2 bg-white"></span>
            <span className="w-1/4 h-2 block mx-2 bg-white"></span>
         </div>
         <div className="py-4">
         <h2 className="font-semibold text-3xl py-2 Henriette font-bold">How do you feel, {auth.name}?</h2>
         <h3 className="text-lg block text-gray-600 ">Pick the categories that you are struggling with.
We can alway discuss with the therapist later.</h3>
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

export default Step3;












