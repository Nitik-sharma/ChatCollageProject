"use client";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useRouter } from "next/navigation";

function ProtectedRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // const checkAuth = async () => {
    //     try {
    //         const response = await axios.get(
    //           " http://localhost:5000/api/auth/profile",{withCredentials:true}
    //         );
    //         if (response.status === 200) {
    //             setIsAuthenticated(true);

    //         } else {
    //             router.push("/");
    //         }
    //     } catch (error) {
    //         router.push("/")
    //     } finally {
    //         setLoading(false);
    //     };

    // }
    // checkAuth();
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);
  if (loading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;

    //   return isAuthenticated ? children : null;
    return children;
}

export default ProtectedRoute;
