"use client";
import React, { useState } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

import {
  faSquareFacebook,
  faSquareInstagram,
  faSquareTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { BoxesCore } from "../../../components/background-boxes";
import { BackgroundGradient } from "../../../components/background-gradient";
import axios from "axios";

import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        " http://localhost:5000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        alert("Login sucessfull ! ✅");
        router.push("/chat");
      }
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Registration failed ❌");
    }
    console.log(formData);
  };
  return (
    <div className=" flex justify-center items-center min-h-screen">
      <BackgroundGradient
        className="your-class"
        containerClassName="your-container-class"
        
      >
        <div className=" bg-white shadow-md rounded-s-lg  px-8 pt-6 mb-4 w-full max-w-md">
          <h2 className=" text-3xl text-center mb-6  font-bold text-white">
            <span className=" bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
              Login{" "}
            </span>
          </h2>
          <form className=" mb-6">
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
                name="email"
                type="email"
                autoComplete="off"
                className=" shadow  appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline leading-tight "
                placeholder="Enter your email ...."
                value={formData.email}
                onChange={handleData}
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
                name="password"
                type="password"
                autoComplete="off"
                className=" shadow  appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline leading-tight "
                placeholder="Enter your password ...."
                value={formData.password}
                onChange={handleData}
              />
            </div>
            <div className=" flex justify-center items-center  m-4">
              <button
                className=" bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-500  hover:to-purple-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                onClick={submitData}
              >
                Login
              </button>
            </div>

            <div className="text-center mt-4">
              <Link href={"/forgot"} className=" text-gray-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-700 ">
                If you do not have an account ?{" "}
                <Link
                  href={"/register"}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>
            <div className="mt-4">
              <p className=" text-center text-gray-700">or log in with :</p>
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
                    className=" w-7 mr-2  text-gray-800 hover:text-blue-600 "
                  />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </BackgroundGradient>
    </div>
  );
}

export default Login;
