"use client"
import React, {  useEffect, useState } from 'react'
import TopBar from '../../../section/TopBar'
import ProtectedRoute from '../../../components/ProtectedRoute'
import axios from 'axios'
import { fetchUserData } from '../../../utils/api'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUser
} from "@fortawesome/free-solid-svg-icons";



function Profile() {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [data, setData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  

  
// handle userInput---->
  const handleInput = (event) => {
    setUsername(event.target.value); // Update state properly
  };

  // handle image ----->
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewImage(URL.createObjectURL(file));
    }
   
  }

  

  // --->getTOken----->
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null; // Return null on server
  };

  
  const token = getToken();
  console.log("token->", token)
  
  if (!token) {
    alert("No token provided Please log in again");
    return;
  }



  // Access user Data----->
  useEffect(() => {
    const storeData = localStorage.getItem("user");
    if (storeData) {
      const userData = JSON.parse(storeData);
      setData(userData);
      setUsername(userData?.username || "");
      if (userData.profilePic) {
        setPreviewImage(`http://localhost:5000/uploads/${userData.profilePic}`);
      }

    } else {
      fetchUserData().then((userData) => {
        if (userData) {
          setData(userData);
          setUsername(userData.username || "")
          if (userData.profilePic) {
            setPreviewImage(
              `http://localhost:5000/uploads/${userData.profilePic}`
            );
          }
          localStorage.setItem("user", JSON.stringify(userData));
        }
      })
    }
  }, [])
  console.log("Data-->", data)
  
const isTokenExpired = (token) => {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    return decoded.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};

if (isTokenExpired(token)) {
  console.error("Token expired. Logging out...");
  alert("Your session has expired. Please log in again.");
  localStorage.removeItem("token");
  return;
}


  // handle  update userData---->
 const handleProfileUpdate = async (e) => {
   e.preventDefault();
   console.log("Updating profile...");

   const token = localStorage.getItem("token");

   if (!token) {
     console.error("No token found in localStorage.");
     alert("You need to log in again.");
     return;
   }

   if (isTokenExpired(token)) {
     console.error("Token expired. Logging out...");
     alert("Your session has expired. Please log in again.");
     localStorage.removeItem("token");
     return;
   }

   const formData = new FormData();
   formData.append("username", username);

   if (profilePic) {
     formData.append("profilePic", profilePic);
   }

   try {
     console.log("Sending request with token:", token);

     const res = await axios.put(
       "http://localhost:5000/api/auth/update",
       formData,
       {
         headers: {
           "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${token}`, // 🟢 Add "Bearer "
         },
       }
     );

   
     localStorage.setItem("user", JSON.stringify(res.data.user));
     setData(res.data.user);
   } catch (error) {
     console.error("Error updating profile:", error.response?.data || error);
     alert(error.response?.data?.message || "Profile update failed.");
   }
 };

  return (
    <div>
      <ProtectedRoute>
        <div className=" min-h-screen">
          <TopBar />
          <div className=" flex flex-col items-center justify-center  p-6">
            <h1 className=" text-3xl font-bold mb-4">Edit your Profile </h1>
            <form
              onSubmit={handleProfileUpdate}
              action=""
              className=" bg-white shadow-md rounded px-8 pt-6 mb-5 pb-6 w-full max-w-md"
            >
              <div className=" flex gap-1 ">
                <input
                  type="text"
                  id="input"
                  placeholder="Enter your username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={username} // Controlled input
                  onChange={handleInput} // Updates state
                />
                <FontAwesomeIcon icon={faUser} size={"2x"} color={"gray"} />
              </div>

              <div className="flex flex-col items-center justify-center gap-2">
                {previewImage ? (
                  <img
                    src={previewImage}
                    className="w-40 h-40 rounded-full object-cover"
                  />
                ) : (
                  <img
                    src="/assests/profile.png"
                    className="w-40 h-40 rounded-full"
                  />
                )}
                <label
                  htmlFor="fileInput"
                  className="font-bold text-gray-800 text-lg cursor-pointer"
                >
                  Upload Your Photo
                </label>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={handleImage}
                />
              </div>
              <button
                type="submit"
                className=" pb-3 py-3  rounded  mt-3 text-center  w-full font-bold hover:bg-teal-700 bg-blue-700"
              >
                {" "}
                Save photo
              </button>
            </form>
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
}

export default Profile
