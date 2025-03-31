"use client";
import React, { useEffect, useState } from "react";
import TopBar from "../../../section/TopBar";
import ProtectedRoute from "../../../components/ProtectedRoute";
import axios from "axios";
import { fetchUserData } from "../../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [data, setData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle user input (username update)
  const handleInput = (event) => {
    setUsername(event.target.value);
  };

  // Handle profile picture selection
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview selected image
    }
  };

  // Get token from local storage
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  const token = getToken();
  console.log("Token ->", token);

  if (!token) {
    alert("No token provided. Please log in again.");
    return;
  }

  // Fetch user data
  useEffect(() => {
    const storeData = localStorage.getItem("user");
    if (storeData) {
      const userData = JSON.parse(storeData);
      setData(userData);
      setUsername(userData?.username || "");
      if (userData.profilePic) {
        setPreviewImage(`http://localhost:5000${userData.profilePic}`);
      }
    } else {
      fetchUserData().then((userData) => {
        if (userData) {
          setData(userData);
          setUsername(userData?.username || "");
          if (userData.profilePic) {
            setPreviewImage(`http://localhost:5000${userData.profilePic}`);
          }
          localStorage.setItem("user", JSON.stringify(userData));
        }
      });
    }
  }, []);

  console.log("Data -->", data);

  // Handle profile update (send data to backend)
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating profile...");

    const formData = new FormData();
    formData.append("username", username);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Update local storage
      setData(res.data.user); // Update state

      console.log("Updated user:", res.data.user);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert(error.response?.data?.message || "Profile update failed.");
    }
  };

  return (
    <div>
      <ProtectedRoute>
        <div className="min-h-screen">
          <TopBar />
          <div className="flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-4">Edit your Profile</h1>
            <form
              onSubmit={handleProfileUpdate}
              className="bg-white shadow-md rounded px-8 pt-6 mb-5 pb-6 w-full max-w-md"
            >
              <div className="flex gap-1">
                <input
                  type="text"
                  id="input"
                  placeholder="Enter your username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={username}
                  onChange={handleInput}
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
                className="pb-3 py-3 rounded mt-3 text-center w-full font-bold hover:bg-teal-700 bg-blue-700"
              >
                Save Profile
              </button>
            </form>
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
}

export default Profile;
