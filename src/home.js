import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_RESTAURANT_DETAILS_FOR_USER } from "./queries/restaurant";
import Layout from "./components/layout";

function Home({ auth }) {
  const [myRestaurantData, setMyRestaurantData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [comments, setComments] = useState("");

  useEffect(() => {
    document.title = `Home`;
  }, []);

  const { loading, error, data } = useQuery(GET_RESTAURANT_DETAILS_FOR_USER, {
    variables: { userId: auth.id }
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const handleSubmit = () => {
    console.log("submitting...");
  };
  return (
    <Layout auth={auth}>
      <div
        className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${
          modalOpen ? "opacity-100" : "opacity-0 pointer-events-none "
        }`}
      >
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div className="modal-container bg-white w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-y-auto">
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

          <form
            className="modal-content py-4 text-left px-6"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-semibold">Simple Modal</p>
              <div
                onClick={() => setModalOpen(false)}
                className="modal-close cursor-pointer z-50"
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
                  rows="4"
                  cols="50"
                  name="comments"
                  value={comments}
                  onChange={e => setComments(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded bg-green-400 hover:bg-green-600 px-4 py-2 mt-2 text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="p-12">
        <h1 className="text-lg md:text-4xl font-semibold ">
          Welcome, {auth.name}
        </h1>
        <div className="shadow rounded-lg bg-white p-4 flex">
          <div className="w-1/2">
            <span className="uppercase text-gray-600 tracking-wider text-sm mb-1 block">
              My Restaurant
            </span>
            <span className="block font-semibold text-lg">
              {data.user[0].restaurant.name}
            </span>
            <span className="block text-green-700">
              {data.user[0].restaurant.description}
            </span>
            <span className="block text-gray-700 text-sm">
              {data.user[0].restaurant.address}
            </span>
          </div>
          <div className="w-1/2 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="border px-4 py-2 rounded hover:bg-gray-100 focus:outline-none"
            >
              New Event
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
