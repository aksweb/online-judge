// ContestsList.js
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { Link } from "react-router-dom";

const ContestsList = () => {
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);
  const { fetchContests } = useContext(AuthContext);

  useEffect(() => {
    const getContests = async () => {
      try {
        console.log("fetching");
        const data = await fetchContests();
        console.log("fetched", data);
        setContests(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getContests();
  }, [fetchContests]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Split contests into upcoming/current and past contests
  const now = new Date();
  const upcomingOrCurrentContests = contests.filter(
    (contest) => new Date(contest.endTime) >= now
  );
  const pastContests = contests.filter(
    (contest) => new Date(contest.endTime) < now
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4  text-red-500">Contests</h1>

      <div>
        <h2 className="text-xl font-semibold mb-2  text-black">
          Upcoming/Current Contests
        </h2>
        {upcomingOrCurrentContests.length === 0 ? (
          <p>No upcoming or current contests</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200  text-blue-900">
              {upcomingOrCurrentContests.map((contest) => (
                <tr key={contest._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contest.contestName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contest.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(contest.startTime).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(contest.endTime).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contest.createdBy.username}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2  text-black">
          Past Contests
        </h2>
        {pastContests.length === 0 ? (
          <p>No past contests</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-black">
              {pastContests.map((contest) => (
                <tr key={contest._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contest.contestName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contest.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(contest.startTime).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(contest.endTime).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contest.createdBy.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/view/${contest._id}`}
                      className="text-blue-500 hover:text-blue-700 underline"
                    >
                      View Contest
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ContestsList;
