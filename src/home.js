import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_RESTAURANT_DETAILS_FOR_USER, CREATE_EVENT } from "./queries/restaurant";
import Layout from "./components/layout";
import { IoMdRestaurant } from "react-icons/io"; 
import { useMutation } from '@apollo/react-hooks';


function Home({ auth }) {
  const [myRestaurantData, setMyRestaurantData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  const [comments, setComments] = useState('');


  useEffect(() => {
    document.title = `Home`;
  }, []);

  const { loading, error, data } = useQuery(GET_RESTAURANT_DETAILS_FOR_USER, {
    variables: { userId: auth.id }
  });

 
  if (error) return `Error! ${error.message}`;


  const [createEvent, { loadingUser }] = useMutation(CREATE_EVENT, {
    onCompleted: (data) => {
      window.location.reload(false);
    }
      
  });

 

  const handleSubmit = (e) =>{
    e.preventDefault();
    createEvent({ variables: { comments: comments,   restaurant_id: data.user[0].restaurant.id, user_id: auth.id } });
  } 



  return (
    <Layout auth={auth}>
      {loading ? 'Loading' : <><div
        className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${
          modalOpen ? "opacity-100" : "opacity-0 pointer-events-none "
        }`}
      >
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div className="modal-container bg-white w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div onClick={()=>setModalOpen(false)} className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
            <svg
              className="fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
            <span onClick={()=>setModalOpen(false)} className="text-sm">(Esc)</span>
          </div>

          <form className="modal-content py-4 text-left px-6" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-semibold">Simple Modal</p>
              <div onClick={()=>setModalOpen(false)} className="modal-close cursor-pointer z-50">
                <svg
                  className="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </div>
            </div>

          <div>

          <div className="mb-4">
            <label
              htmlFor="comments"
              className="block text-gray-900 leading-tight"
            >
              Comments
            </label>

            <textarea
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-green-400"
              id="comments"
              rows="4" cols="50"
              name="comments"
              value={comments}
              onChange={e => setComments(e.target.value)}
            />
          </div>
          </div>

          <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div className="p-6 md:p-0 md:py-6 -mt-40">
        <div className="bg-white rounded-lg shadow-xl">

        <div className="bg-white  border-green-500 p-6 rounded-t-lg">
          <div className="text-center">
            {/* <span className="uppercase text-green-600 tracking-widest font-semibold text-sm mb-1 block">
              My Restaurant
            </span> */}
            <div className="h-12 w-12 bg-gray-300 flex items-center justify-center rounded-full mx-auto"><IoMdRestaurant size={20}/></div>
            <span className="block font-semibold text-lg md:text-2xl">
              {data.user[0].restaurant.name}
            </span>
            <span className="block text-gray-700">
              {data.user[0].restaurant.description} - {data.user[0].restaurant.address}
            </span>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-8 border p-8 py-3 font-semibold rounded-lg  bg-green-600 hover:bg-green-500 text-white focus:outline-none    mx-auto"
            >+ New Event
            </button>
          </div>
        
        </div>

              {data.events.length > 0 ?<div className="bg-gray-200  p-20 flex items-center justify-center text-center">{data.events.map((item,i)=>{
                return (
                  <div className="bg-white rounded-lg shadow p-4">{new Date(item.date).toLocaleTimeString('en-US')} {item.comments}</div>
                )
              })}</div> : <div className="bg-gray-200 text-gray-700 text-lg font-semibold p-20 flex items-center justify-center text-center">

No recent events
</div>}

        </div>
        {/* <h1 className="text-lg md:text-4xl font-semibold ">
          Welcome, {auth.name}
        </h1> */}
       
      </div></> }
      
    </Layout>
  );
}

export default Home;
