"use client"
import React from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocketchat,
 
} from "@fortawesome/free-brands-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { usePathname,useRouter } from "next/navigation";
import axios from 'axios';



function TopBar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
       await axios.post(
         "http://localhost:5000/api/auth/logout",
         {},
         { withCredentials: true }
      );
      localStorage.removeItem("token")
       alert("Logout sucessfully ");
      router.push("/");
      
    } catch (error) {
        console.error("Logout failed", error.response?.data || error.message);
    }

  
  }

  
  return (
    <div className=" topbar flex  justify-between">
      <div className=" flex items-center gap-1.5">
        <Link href={"/chat"}>
          <FontAwesomeIcon
            icon={faRocketchat}
            size={"3x"}
            className="w-12 text-amber-700 hover:text-amber-600"
          />
        </Link>
        <h1 className=" font-bold  text-3xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400  rounded p-1 ">
          Chat App
        </h1>
      </div>
      <div className=" menu flex gap-6 items-center">
        <Link
          href="/chat"
          className={`${
            pathname === "/chat" ? "text-red-500" : ""
          }  text-xl font-bold`}
        >
          Chats
        </Link>
        <Link
          href={"/contect"}
          className={`${
            pathname === "/contect" ? "text-red-500" : ""
          }  text-xl font-bold`}
        >
          Contect
        </Link>

        <FontAwesomeIcon
          icon={faRightFromBracket}
          size={"3x"}
          color="gray"
          id="logout"
          className=" cursor-pointer hover: text-yellow-200"
          onClick={handleLogout}
        />
        <img src="/assests/profile.png" alt="" width="50" height="50" />
      </div>
    </div>
  );
}

export default TopBar
