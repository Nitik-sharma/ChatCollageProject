"use client"
import React, {  useEffect, useState } from 'react'
import TopBar from '../../../section/TopBar'
import ProtectedRoute from '../../../components/ProtectedRoute'
import axios from 'axios'
import { fetchUserData } from '../../../utils/api'



function Profile() {
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null; // Return null on server
  };

  const [data, setData] = useState(null);
  const token = getToken();
  console.log("token->",token)

  useEffect(() => {
    const storeData = localStorage.getItem("user");
    if (storeData) {
      setData(JSON.parse(storeData))
    } else {
      fetchUserData().then((userData) => {
        if (userData) {
          setData(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      })
    }
  }, [])
  console.log("Data-->",data)

   

  return (
    <div>
      <ProtectedRoute>
        <TopBar />
        <div>
          <div>{data ? `Welcome ${data.user.username}` : "Loading..."}</div>
        </div>
      </ProtectedRoute>
    </div>
  );
}

export default Profile
