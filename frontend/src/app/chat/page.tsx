"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TopBar from './../../../section/TopBar';
import ProtectedRoute from "../../../components/ProtectedRoute";
import { fetchUserData } from "../../../utils/api";

function Chat() {

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  }
  const [data, setData] = useState(null);
  const token = getToken();
  console.log("token", token);

  

  useEffect(() => {
    const storeData = localStorage.getItem("user");

    if (storeData) {
      setData(JSON.parse(storeData));
    } else {
      fetchUserData().then((userData) => {
        if (userData) {
          setData(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      })
    }
  },[])
  

 console.log("Data-->",data)

    return (
      <div>
        <ProtectedRoute>
          <TopBar />
          <div>
            {data ? (
              <h2>Welcome, {data.user.username}</h2>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </ProtectedRoute>
      </div>
    );
}

export default Chat;
