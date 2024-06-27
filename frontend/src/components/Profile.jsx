import React from "react";

const Profile = () => {
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
        <div className="px-8 py-6">
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
            &nbsp;&nbsp;&nbsp;&nbsp;name:{" "}
            <span className="text-yellow-300">'Scott Windon'</span>,
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;position:{" "}
            <span className="text-yellow-300">'fullstack-developer'</span>,
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;website:{" "}
            <span className="text-yellow-300">
              '
              <a
                href="https://scottwindon.com"
                target="_blank"
                className="text-yellow-300 hover:underline focus:border-none"
              >
                https://scottwindon.com
              </a>
              '
            </span>
            ,
          </p>
          <p>&nbsp;&nbsp;{"}"}</p>
          <p>{"}"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
