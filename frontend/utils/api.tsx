import axios from "axios";

export const fetchUserData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found !!");
    return null;
  }

  try {
    const response = await axios.get("http://localhost:5000/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // ✅ Corrected placement
    });

    return response.data;
  } catch (error) {
    console.log(
      "Error fetching user data:",
      error.response?.data || error.message
    );
    throw error;
  }
};
