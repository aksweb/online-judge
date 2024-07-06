import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HtmlPage from "./HtmlPage";
const Home = () => {
  const [contests, setContests] = useState([]);
  const [showPreloader, setShowPreloader] = useState(true);
  const BACKEND_BASE = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE}/getcontests`);
        const contestsData = response.data;

        const currentDate = new Date();
        const pastContests = [];
        const currentAndUpcomingContests = [];

        contestsData.forEach((contest) => {
          const endDate = new Date(contest.endTime);
          if (endDate < currentDate) {
            pastContests.push(contest);
          } else {
            currentAndUpcomingContests.push(contest);
          }
        });

        pastContests.sort((a, b) => new Date(b.endTime) - new Date(a.endTime));
        currentAndUpcomingContests.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime)
        );

        setContests([...pastContests, ...currentAndUpcomingContests]);
        //preloader
        setTimeout(() => {
          setShowPreloader(false); // Hide the preloader after 1.3 seconds
        }, 1300);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []);

  return (
    <div className="flex flex-wrap lg:flex-nowrap text-black relative ">
      {/* Contest History */}

      {showPreloader && <HtmlPage src="/New.html" />}
      {!showPreloader && (
        <>
          <div className="w-full  lg:w-2/5 px-2 py-4 lg:px-4 h-screen overflow-y-auto no-scrollbar">
            <div className="bg-white bg-opacity-25 shadow-md rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 p-4">
                <h3 className="text-lg font-semibold text-white">
                  Contest History
                </h3>
              </div>
              <div className="p-4">
                <div id="current-upcoming-contests">
                  <h4 className="text-md font-semibold mb-2">
                    <span class="relative flex h-3 w-3">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                    Current & Upcoming Contests
                  </h4>
                  <ul className="list-disc pl-4">
                    {contests
                      .filter(
                        (contest) => new Date(contest.endTime) >= new Date()
                      )
                      .map((contest) => (
                        <li key={contest._id} className="py-1">
                          <a className="text-red-500 hover:underline">
                            {contest.contestName} -{" "}
                            {new Date(contest.startTime).toLocaleDateString()}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
                <hr className="my-4" />
                <div id="past-contests">
                  <h4 className="text-md font-semibold mb-2">Past Contests</h4>
                  <ul className="list-disc pl-4">
                    {contests
                      .filter(
                        (contest) => new Date(contest.endTime) < new Date()
                      )
                      .map((contest) => (
                        <li key={contest._id} className="py-1">
                          <Link
                            to={`/view/${contest._id}`}
                            className="text-red-500 hover:underline"
                          >
                            {contest.contestName} -{" "}
                            {new Date(contest.endTime).toLocaleDateString()}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <br />

                <p className="text-center">
                  <Link to="/contest" className="text-red-500 hover:underline">
                    View More
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Recently Posted Contests */}
          <div className="w-full lg:w-3/5 px-2 py-4 lg:px-4 h-screen overflow-y-auto no-scrollbar text-black relative">
            <div className="bg-white bg-opacity-25 shadow-md rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 p-4">
                <h3 className="text-lg font-semibold text-white">
                  Recently Posted Contests
                </h3>
              </div>

              <div className="p-4">
                {contests.map((contest) => (
                  <div
                    key={contest._id}
                    className="mb-4 bg-gray-50 p-4 rounded-md shadow-sm transition duration-300 hover:shadow-lg"
                  >
                    <h4 className="text-md font-semibold mb-2 text-gray-800">
                      {contest.contestName}
                    </h4>
                    <img
                      src={`${BACKEND_BASE}/${contest.photo}`}
                      alt={contest.contestName}
                      className="mb-2 rounded-md shadow-sm"
                    />
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {new Date(contest.startTime).toLocaleDateString()} <br />
                      <strong>End Date:</strong>{" "}
                      {new Date(contest.endTime).toLocaleDateString()} <br />
                      <strong>Number of Problems:</strong>{" "}
                      {contest.problems.length} <br />
                      <strong>Created By:</strong> {contest.createdBy.username}
                      <Link
                        to={`/view/${contest._id}`}
                        className="text-red-500 hover:text-red-700 underline ml-2"
                      >
                        View Contest
                      </Link>
                    </p>
                    <img
                      src="assets/down.png"
                      className="animate-bounce w-6 h-6"
                      style={{
                        position: "fixed",
                        bottom: "70px",
                        right: "20px",
                      }}
                      alt="Down Arrow"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
