"use client";
import React from 'react'
import Link from 'next/link';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope,faLock,faUser } from '@fortawesome/free-solid-svg-icons';
import {
  faSquareFacebook,
  faSquareInstagram,
  faSquareTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Register() {

    
    
  return (
    <div className=" flex justify-center items-center min-h-screen">
      <div className=" bg-white shadow-md rounded px-8 pt-6 mb-4 w-full max-w-md">
        <h2 className=" text-3xl text-center mb-6  font-bold text-white">
          <span className=" bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
            Register
          </span>
        </h2>
        <form className=" mb-6">
          <label
            htmlFor="text"
            className="  block text-gray-700 text-sm font-bold mb-2"
          >
            <FontAwesomeIcon
              icon={faUser}
              className=" mr-2  inline-block w-3.5"
            />
            Username
          </label>
          <div>
            <input
              id="username"
              type="text"
              required
              autoComplete="off"
              className=" shadow  appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline leading-tight "
              placeholder="Enter your username ...."
            />
          </div>

          <label
            htmlFor="email"
            className="  block text-gray-700 text-sm font-bold mb-2 mt-3"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className=" mr-2  inline-block w-3.5"
            />
            Email
          </label>
          <div>
            <input
              id="email"
              type="email"
              required
              autoComplete="off"
              className=" shadow  appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline leading-tight "
              placeholder="Enter your email ...."
            />
          </div>

          <label
            htmlFor="password"
            className="  block text-gray-700 text-sm font-bold mb-2 mt-3"
          >
            <FontAwesomeIcon
              icon={faLock}
              className=" mr-2  inline-block w-3.5"
            />
            Password
          </label>
          <div>
            <input
              id="password"
              type="password"
              required
              autoComplete="off"
              className=" shadow  appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline leading-tight "
              placeholder="Enter your password ...."
            />
          </div>

          <div className=" flex justify-center items-center  m-4">
            <button className=" bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-500  hover:to-purple-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Register
            </button>
          </div>

          <div className="text-center mt-4">
            <Link href={"/forgot"} className=" text-black">
              Forgot Password?
            </Link>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link
                href={"/login"}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
          <div className="mt-4">
            <p className=" text-center text-gray-700">or register in with :</p>
            <div className=" flex items-center justify-center mt-2">
              <Link href={"/"}>
                <FontAwesomeIcon
                  icon={faSquareFacebook}
                  className=" w-7 mr-2  text-gray-800 hover:text-blue-600"
                />
              </Link>
              <Link href={"/"}>
                <FontAwesomeIcon
                  icon={faSquareInstagram}
                  className=" w-7 mr-2  text-gray-800 hover:text-pink-700 "
                />
              </Link>
              <Link href={"/"}>
                <FontAwesomeIcon
                  icon={faSquareTwitter}
                  className=" mr-2  text-gray-800 hover:text-blue-600 "
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register
