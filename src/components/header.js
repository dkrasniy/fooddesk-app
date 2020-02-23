
import React from "react"
import Logo from "./logo"
import {LogOutUser} from '../auth'

const Header = ({ auth }) => {

  console.log(auth.type)
  return (
    <div className="flex flex-col justify-between h-full">
   <div>
   <div className="w-full p-4">
      <Logo/>
    </div>
    <ul>
      <li>Home</li>
      <li>Restaurants</li>
      {auth.type === 3 ?  <li>Add New Restaurant</li> : null}
      
    </ul>
     </div> 
    

    <div>
      <span className="text-gray-700 text-sm text-center">Logged in as {auth.name}</span>
      <button type="button" className="bg-white p-2 w-full rounded-lg" onClick={()=>LogOutUser()}>Log Out</button>
    </div>

    </div>
  )
}

export default Header
