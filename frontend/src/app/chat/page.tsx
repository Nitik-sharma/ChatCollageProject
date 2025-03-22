"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TopBar from './../../../section/TopBar';
import ProtectedRoute from "../../../components/ProtectedRoute";

function Chat() {
  const [data, setData] = useState(null);

  // useEffect(() => {
  // if (typeof window !== "undefined") {
  // const storeUser = localStorage.getItem("user");

  // if (storeUser) {
  // const parseData = JSON.parse(storeUser);
  // setData(parseData);
  // console.log("Login user data:",parseData)
  // } else {
  // console.log("No user ")
  // }
  // }
  // }, [])

  const fetchData = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/user", {
        headers: {
          Authorization: token,
        },
      });
      setData(response.data);
      console.log("Fetch user data", response.data);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data || error.message
      );
    }
  };

    return (
      <div>
        <ProtectedRoute>
          <TopBar />
        </ProtectedRoute>
      </div>
    );
}

export default Chat;
