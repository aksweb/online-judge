// ContestsList.js
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./auth/AuthContext";

const ContestsList = () => {
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);
  const { fetchContests } = useContext(AuthContext);

  useEffect(() => {
    const getContests = async () => {
      try {
        console.log("fetching");
        const data = await fetchContests();
        console.log("fethed", data);
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

  return (
    <div>
      <h1>Contests</h1>
      {contests.length === 0 ? (
        <p>No contests available</p>
      ) : (
        <ul>
          {contests.map((contest) => (
            <li key={contest._id}>
              <h2>{contest.contestName}</h2>
              <p>{contest.duration}</p>
              <p>
                Start Time:{" "}
                {new Date(contest.startTime).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
              <p>
                End Time:{" "}
                {new Date(contest.endTime).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>

              <p>Created by: {contest.createdBy.username}</p>
              {/* Add more contest details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContestsList;
