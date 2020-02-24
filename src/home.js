import React, { useState, useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import {
  GET_RESTAURANT_DETAILS_FOR_USER,
  GET_EVENTS_SUB,
  CREATE_EVENT,
  UPDATE_EVENT
} from "./queries/restaurant";
import Layout from "./components/layout";
import { IoMdRestaurant, IoIosCar } from "react-icons/io";
import { useMutation } from "@apollo/react-hooks";
import { Users, Frown, MessageCircle, Clock, Check, Lock } from "react-feather";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')


function Home({ auth }) {

  
  const [myRestaurantData, setMyRestaurantData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedCount, setFeedCount] = useState("");

  let claimedItems = [];

  const [comments, setComments] = useState("");

  useEffect(() => {
    document.title = `Home`;
  }, []);

  const [createEvent, { loadingUser }] = useMutation(CREATE_EVENT, {
    onCompleted: data => {
      window.location.reload(false);
    }
  });

  // const { loading, error, data } = useSubscription(GET_EVENTS_SUB, {
  //   variables: { userId: auth.id }
  // });

  const { loading, error, data } = useQuery(GET_RESTAURANT_DETAILS_FOR_USER, {
    variables: { userId: auth.id }
  });

  // const { subscribeToEvents, ...result } = useQuery(
  //   GET_EVENTS_SUB,
  //  {  variables: { userId: auth.id }}
  // );
  

  const [updateEventClaimer, { loadingUpdateClaimer }] = useMutation(
    UPDATE_EVENT,
    {
      onCompleted: data => {
        window.location.reload(false);
      }
    }
  );

  if (error) return `Error! ${error.message}`;

  const handleSubmit = e => {
    e.preventDefault();
    createEvent({
      variables: {
        comments: comments,
        feedCount: feedCount,
        restaurant_id: data.user[0].restaurant.id,
        user_id: auth.id
      }
    });
  };

  const claimEvent = (event, userid) => {
    claimedItems.push(event);
    updateEventClaimer({ variables: { eventId: event, claimerId: userid } });
  };

  const Event = ({
    id,
    date,
    comments,
    restaurantName = null,
    restaurantAddress = null,
    feedCount = null,
    claimer
  }) => (
    <div className="bg-white p-4 rounded-lg  my-2 text-left w-full flex">



<span className="text-4xl font-semibold text-gray-300 block">{id}</span>

<div className="pl-4 w-full flex flex-wrap">
  <div className="w-full md:w-2/3">
    <div className=" py-2 flex items-center text-gray-800">
      <Clock size={20} className="text-gray-600 pr-1" />
      {date.toLocaleTimeString("en-US")}
    </div>
    {timeAgo.format(date,'short')}


    <span className="text-lg font-semibold">{comments}</span>
    <span className="text-gray-600 block flex items-center">
    <Users size={20} className="text-gray-600 pr-1" />
          {feedCount ? feedCount : "Not specified"}
    </span>

  </div>

  <div className="border-t flex items-center justify-left md:w-1/3 my-4 py-4 w-full md:border-0 md:justify-center">
    {claimer && claimer.id ?  (
        <div className="text-red-600 items-center flex"><div className="bg-red-600 rounded-full text-white p-2 h-8 w-8 flex items-center justify-center"><Lock/></div><span className="font-semibold ml-2 leading-tight">Claimed<span className="block font-normal">by {claimer.name}</span></span></div>
      )
    : (
      <div className="text-green-600 items-center flex"><div className="bg-green-500 rounded-full text-white p-2 h-8 w-8 flex items-center justify-center"><Check/></div><span className="font-semibold ml-2">Available</span></div>
    )}
  </div>
</div>




    </div>
  );

  const EventDistributor = ({
    id,
    date,
    comments,
    restaurantName = null,
    restaurantAddress = null,
    feedCount = null,
    claimer
  }) => (
    <div
      className={`bg-white p-4 rounded-lg  my-2 text-left w-full flex border-l-2 ${
        claimer && claimer.id ? "border-red-500" : "border-green-600"
      }`}
    >
    

      <div className="pl-4 w-full flex flex-wrap">
        <div className="w-full md:w-2/3">
          {/* <div className=" py-2 flex items-center text-gray-800">
            <Clock size={20} className="text-gray-600 pr-1" />
            {date.toLocaleTimeString("en-US")}
          </div> */}
            <span className="text-xl font-semibold text-gray-400 block block w-full">{timeAgo.format(date,'short')}</span>

          <span className="text-lg font-semibold">{restaurantName}</span>
          <span className="text-gray-600 block text-sm">
            {restaurantAddress ? restaurantAddress : null}
          </span>
          <div className="py-2">
            <span className="block flex-wrap  flex items-center justify-between">
              <div className=" py-1 w-full flex items-center text-gray-800">
                <MessageCircle size={20} className="text-gray-600 pr-1" />
                {comments}
              </div>
              <div className=" py-1 w-full flex items-center text-gray-800">
                <Users size={20} className="text-gray-600 pr-1" />
                {feedCount ? feedCount : "Not specified"}
              </div>
              
            </span>
          </div>
        </div>

        <div className="w-full md:w-1/3 items-center flex justify-center">
          {claimer && claimer.id ? (
            claimer.id == auth.id ? (
              <div className="text-center">
                 <div className="text-red-600 items-center flex"><div className="bg-red-600 rounded-full text-white p-1 h-5 w-5 flex items-center justify-center"><Check/></div><span className="font-semibold ml-2">Claimed</span></div>
               
                <button
                  type="button"
                  onClick={() => claimEvent(id, null)}
                  className="rounded py-1 px-2   bg-white hover:bg-gray-100 focus:outline-none  my-2"
                >
                  Cancel claim
                </button>
              </div>
            ) : (
              "claimed"
            )
          ) : (
            <button
              type="button"
              onClick={() => claimEvent(id, auth.id)}
              className="rounded py-1 px-2   bg-white hover:bg-gray-100 focus:outline-none border my-2"
            >
              Claim
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const RestaurantIntro = () => (
    <div className="flex items-center">
      <div>
      <div className="h-12 w-12 bg-gray-300 flex items-center justify-center rounded-full mx-auto">
        <IoMdRestaurant size={20} />
      </div>
      </div>
      <span className="block font-semibold text-lg md:text-2xl">
        {data.user[0].restaurant.name}
      </span>
      <span className="block text-gray-700">
        {data.user[0].restaurant.description} -{" "}
        {data.user[0].restaurant.address}
      </span>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="mt-8 border p-8 py-3 font-semibold rounded-lg  bg-green-600 hover:bg-green-500 text-white focus:outline-none    mx-auto"
      >
        + New Event
      </button>
    </div>
  );

  const DistributorIntro = () => (
    <div className="flex items-center">
      <div>

      <div className="h-12 w-12 bg-gray-300 flex items-center justify-center rounded-full mx-auto">
        <IoIosCar size={20} />
      </div>
      </div>
      <div className="pl-4">
      <span className="block font-semibold text-lg md:text-2xl">
        {auth.name}
      </span>
      <span className="block text-gray-700">Distributor</span>
      </div>
    </div>
  );

  const MyRestaurantEvents = ({ events }) => (
    <div className="text-center">
      {events.length > 0 ? (
        <div className="bg-gray-200  p-8">
          {events.map((item, i) => {
            return (
              <Event
                id={item.id}
                date={new Date(item.date)}
                comments={item.comments}
                feedCount={item.feedcount}
                claimer={item.userclaimer}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-200 text-gray-700 text-lg font-semibold p-20 flex items-center justify-center text-center">
          No recent events
        </div>
      )}
    </div>
  );

  const DistributorEvents = ({ events }) => (
    <div className="text-center">
      {events.length > 0 ? (
        <div className="bg-gray-200  p-8">
          {events.map((item, i) => {
            return (
              <EventDistributor
                id={item.id}
                date={new Date(item.date)}
                comments={item.comments}
                restaurantName={item.restauranteventid.name}
                restaurantAddress={item.restauranteventid.address}
                feedCount={item.feedcount}
                claimer={item.userclaimer}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-200 text-gray-700 text-lg font-semibold p-20 flex items-center justify-center text-center">
          No recent events
        </div>
      )}
    </div>
  );

  return (
    <Layout auth={auth}>
      {loading ? (
        "Loading"
      ) : (
        <>
          <div
            className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${
              modalOpen ? "opacity-100" : "opacity-0 pointer-events-none "
            }`}
          >
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

            <div className="modal-container bg-white w-11/12 md:max-w-lg mx-auto rounded-lg shadow-lg z-40 overflow-y-auto">
              <div
                onClick={() => setModalOpen(false)}
                className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
              >
                <svg
                  className="fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
                <span onClick={() => setModalOpen(false)} className="text-sm">
                  (Esc)
                </span>
              </div>

              <form className="modal-content text-left" onSubmit={handleSubmit}>
                <div className="flex justify-between items-center pb-3 py-4 px-6">
                  <p className="text-xl font-semibold">Add New Event</p>
                  <div
                    onClick={() => setModalOpen(false)}
                    className="bg-gray-100 hover:bg-gray-200 cursor-pointer flex h-8 items-center justify-center modal-close rounded-full w-8 z-50"
                  >
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

                <div className="bg-gray-100 py-4 px-6">
                  <div className="mb-4">
                    <label
                      htmlFor="comments"
                      className="block text-gray-900 leading-tight"
                    >
                      Food Description
                    </label>

                    <textarea
                      required
                      className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-green-400"
                      id="comments"
                      rows="4"
                      cols="50"
                      name="comments"
                      value={comments}
                      onChange={e => setComments(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="feedcount"
                      className="block text-gray-900 leading-tight"
                    >
                      How many can this feed?
                    </label>
                    <input
                      required
                      className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-green-400"
                      type="number"
                      id="feedcount"
                      name="feedcount"
                      value={feedCount}
                      onChange={e => setFeedCount(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end my-4">
                    <button
                      type="submit"
                      className="w-full bg-green-500 hover:bg-green-600 py-3 px-6 rounded-lg font-semibold text-white"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="p-6 md:p-0 md:py-6 -mt-40">
            <div className="bg-white rounded-lg shadow-xl">
              <div className="bg-white Henriette font-bold text-lg border-green-500 p-8 rounded-t-lg">
                 Welcome to Skyduling, {auth.name}
              </div>

              <div className="flex flex-wrap">
                {auth.type !== 1 ? (
                  <div className="w-full md:w-1/3  order-1 md:order-2 bg-gray-100 p-8">
                    {data.myClaimed && data.myClaimed.length > 0 ? (
                      <>
                        {data.myClaimed.map((item, i) => (
                          <div
                            key={i}
                            className="bg-gray-300 rounded-lg my-2 p-4 text-gray-900"
                          >
                            <span className="block font-semibold text-gray-800">
                              {item.restauranteventid.name}
                            </span>
                            <span className="block text-gray-700 text-sm">
                              {item.restauranteventid.address}
                            </span>
                          </div>
                        ))}{" "}
                        <a href={`http://maps.apple.com/?q=${data.myClaimed[0].restauranteventid.address}`}
                          type="button"
                          className="text-center block w-full bg-gray-200 rounded-lg my-2 p-4 text-gray-900"
                        >
                          Start Route
                        </a>
                      </>
                    ) : (
                      <span className="text-lg text-gray-700 p-4 block text-center">
                         
                       You have no upcoming events. 
                      </span>
                    )}
                  </div>
                ) : null}

                <div
                  className={`w-full ${
                    auth.type !== 1 ? "md:w-2/3 order-2 md:order-1" : null
                  }`}
                >
                  
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default Home;
