import { createContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

const BASE_URL = "http://localhost:3000";

export const fetchProblemsFromExpiredContests = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/problemsFromExpiredContests`);
    return response.data; // Assuming response.data is an array of problems
  } catch (error) {
    console.error("Error fetching problems from expired contests:", error);
    throw error;
  }
};
export const fetchContests = async () => {
  try {
    console.log("fet frommauth");
    const response = await axios.get(`${BASE_URL}/getcontests`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contests:", error);
    throw error;
  }
};

export const fetchContestById = async (contestId) => {
  try {
    console.log("Fetching contest by ID:", contestId);
    const response = await axios.get(`${BASE_URL}/contest/${contestId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contest:", error);
    throw error;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");
    const role = localStorage.getItem("role");
    return token ? { loggedIn: true, token, role } : null;
  });

  const register = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, formData);
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const login = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, formData, {
        withCredentials: true,
      });
      console.log("login response: ", response.data);
      setAuth({
        loggedIn: true,
        token: response.data.token,
        role: response.data.adminRole,
        userEmail: response.data.userEmail,
      });
      // localStorage.setItem("auth", auth);
      localStorage.setItem("userEmail", response.data.userEmail);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.adminRole);
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  const logout = async () => {
    await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    setAuth(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
  };
  const createPost = async (formData) => {
    try {
      // Log FormData entries
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      await axios.post(`${BASE_URL}/create`, formData, {
        withCredentials: true,
      });
      alert("Contest posted successfully.");
      // setPosts([...posts, response.data]);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        register,
        login,
        logout,
        createPost,
        fetchContests,
        fetchContestById,
        problemsFromExpiredContests: fetchProblemsFromExpiredContests,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
