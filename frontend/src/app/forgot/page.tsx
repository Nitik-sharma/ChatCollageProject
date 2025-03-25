"use client";

import React from "react";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { BackgroundLines } from "../../../components/background-lines";
function page() {
  return (
    <BackgroundBeamsWithCollision className="">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
          <h2 className="text-3xl text-center mb-6 font-bold text-white">
            <span className="bg-gradient-to-r text-transparent from-blue-800 to-purple-800 bg-clip-text">
              Forgot Password
            </span>
          </h2>
          <form className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <FontAwesomeIcon
                icon={faUser}
                className="mr-2 inline-block w-3.5"
              />
              Email
            </label>
            <div>
              <input
                type="email"
                id="email"
                required
                autoComplete="off"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline leading-tight"
                placeholder="Enter your email..."
              />
            </div>
            <div className="flex justify-center items-center mt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Send mail
              </button>
            </div>
            <div className="text-center mt-4 flex items-center justify-between">
              <p className="text-gray-700">
                <Link
                  href="/login"
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  For Login
                </Link>
              </p>
              <p className="text-gray-700">
                <Link
                  href="/register"
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  For Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default page;
