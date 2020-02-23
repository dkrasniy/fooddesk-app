import React, { useState } from "react";
import logo from "./logo.svg";
import { ChevronLeft } from "react-feather";
import { Link, Router } from "@reach/router";
import Layout from './components/layout'

function About() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Layout>
    <div className="App bg-gray-800 text-center min-h-screen items-center flex justify-around">
      <div>
        <img src={logo} className="w-64 mx-auto" alt="logo" />
        <p className="text-white text-semibold text-lg">
          About David &amp; Louis
        </p>
        <form
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          className="py-8 text-left"
        >
           <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact" />
           
          <label className="block text-white w-full">
            Your Name:{" "}
            <input
              className="block rounded text-gray-900 p-3 w-full"
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>

          <label className="block text-white mt-4">
            Message:{" "}
            <textarea
              className="block rounded text-gray-900 p-3 w-full"
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
            ></textarea>
          </label>

          <button
            className="bg-white block w-full w-full p-3 rounded my-4  hover:bg-gray-100"
            type="submit"
          >
            Send
          </button>
        </form>

        <Link className="text-gray-500 block" to="/">
          <ChevronLeft width={18} className="inline" /> Go back home
        </Link>
      </div>
    </div>
    </Layout>
  );
}

export default About;
