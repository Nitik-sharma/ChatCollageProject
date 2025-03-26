"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocketchat,
 
} from "@fortawesome/free-brands-svg-icons";
import { faRightFromBracket,faBars,faTimes } from "@fortawesome/free-solid-svg-icons";
import { usePathname,useRouter } from "next/navigation";
import axios from 'axios';
import { fetchUserData } from '../utils/api';



function TopBar() {
  const [open, setOpen] = useState(false);
  const toggleBtn = () => {
    setOpen(!open);
  }
  const pathname = usePathname();
  const router = useRouter();
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
    console.log("Data-->", data);

  const handleLogout = async () => {
    try {
       await axios.post(
         "http://localhost:5000/api/auth/logout",
         {},
         { withCredentials: true }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
       alert("Logout sucessfully ");
      router.push("/");
      
    } catch (error) {
        console.error("Logout failed", error.response?.data || error.message);
    }

  
  }


  return (
    <nav className=" flex items-center justify-between bg-gray-800 text-white">
      <div className=" text-2xl font-bold flex  items-center justify-center gap-1">
        <Link href={"/chat"}>
          <FontAwesomeIcon
            icon={faRocketchat}
            size={"3x"}
            className="w-12 text-amber-700 hover:text-amber-600"
          />
        </Link>
        <h1 className=" font-bold text-3xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 rounded p-1 ">
          Hello Chat
        </h1>
      </div>
      <div className=" hidden md:flex justify-between items-center gap-2">
        
        <Link
          href={"/chat"}
          className=" font-bold hover:text-gray-500 hover:text-2xl "
        >
          Chat
        </Link>
        <Link
          href={"/contact"}
          className=" font-bold hover:text-gray-500 hover:text-2xl "
        >
          contact
        </Link>
        <Link
          href={"/profile"}
          className=" font-bold hover:text-gray-500 hover:text-2xl "
        >
          Profile
        </Link>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          size={"3x"}
          color="gray"
          id="logout"
          className=" cursor-pointer hover: text-yellow-200"
          onClick={handleLogout}
        />
        <img
          src="/assests/avter.jpg"
          alt="profile-pic"
          height={50}
          width={50}
        />
      </div>

      <div className=" md:hidden flex items-center">
        <FontAwesomeIcon
          icon={open ? faTimes : faBars}
          size={"3x"}
          onClick={toggleBtn}
          className=" hover:text-gray-600 cursor-pointer"
        />
      </div>
      {open && (
        <div className=" absolute top-16 left-0 right-0  bg-gray-800 md:hidden">
          <div className=" flex flex-col p-4">
            
            <Link
              href={"/chat"}
              className=" font-bold hover:text-gray-500 hover:text-2xl p-2"
            >
              Chat
            </Link>
            <Link
              href={"/contact"}
              className=" font-bold hover:text-gray-500 hover:text-2xl p-2"
            >
              contact
            </Link>
            <Link
              href={"/profile"}
              className=" font-bold hover:text-gray-500 hover:text-2xl p-2"
            >
              Profile
            </Link>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size={"3x"}
              color="gray"
              id="logout"
              className=" cursor-pointer hover: text-yellow-200"
              onClick={handleLogout}
            />
            <img
              src="/assests/avter.jpg"
              alt="profile-pic"
              height={50}
              width={50}
            />
          </div>
        </div>
      )}
    </nav>
  );
}

export default TopBar
