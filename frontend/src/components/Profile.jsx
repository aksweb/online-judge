import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./auth/AuthContext";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = auth["userEmail"];
        const response = await axios.get(
          `http://localhost:3000/user?email=${email}`
        );
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [auth]);

  const calculateMonthsAgo = (registrationDate) => {
    const now = new Date();
    const registered = new Date(registrationDate);
    const diffYears = now.getFullYear() - registered.getFullYear();
    const diffMonths = now.getMonth() - registered.getMonth();
    return diffYears * 12 + diffMonths;
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profilePicture", selectedFile);
    formData.append("email", auth["userEmail"]);

    try {
      const response = await axios.post(
        "http://localhost:3000/uploadProfilePicture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5">
      <div
        className="rounded-lg shadow-xl bg-gray-900 text-white"
        style={{ width: "450px" }}
      >
        <div className="border-b border-gray-800 px-8 py-3">
          <div className="inline-block w-3 h-3 mr-2 rounded-full bg-red-500"></div>
          <div className="inline-block w-3 h-3 mr-2 rounded-full bg-yellow-300"></div>
          <div className="inline-block w-3 h-3 mr-2 rounded-full bg-green-400"></div>
        </div>
        <div className="px-8 py-6 text-center">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="rounded-full mx-auto mb-4"
            style={{ width: "150px", height: "150px" }}
          />
          <p>
            <em className="text-blue-400">const</em>{" "}
            <span className="text-green-400">aboutMe</span>{" "}
            <span className="text-pink-500">=</span>{" "}
            <em className="text-blue-400">function</em>() {"{"}
          </p>
          <p>
            &nbsp;&nbsp;<span className="text-pink-500">return</span> {"{"}
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;username:{" "}
            <span className="text-yellow-300">'{user.username}'</span>,
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;email:{" "}
            <span className="text-yellow-300">'{user.email}'</span>,
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;registered:{" "}
            <span className="text-yellow-300">
              '{calculateMonthsAgo(user.createdAt)} months ago'
            </span>
            ,
          </p>
          <p>&nbsp;&nbsp;{"}"}</p>
          <p>{"}"}</p>
          <div className="mt-4">
            <input type="file" onChange={handleFileChange} />
            <button
              onClick={handleUpload}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Upload Profile Picture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
