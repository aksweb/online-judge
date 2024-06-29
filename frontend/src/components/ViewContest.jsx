// ViewContest.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";

const ViewContest = () => {
  const [contest, setContest] = useState(null);
  const [error, setError] = useState(null);
  const { contestId } = useParams();
  const { fetchContestById } = useContext(AuthContext);

  useEffect(() => {
    const getContest = async () => {
      try {
        console.log("inside view");
        const data = await fetchContestById(contestId);
        console.log(contestId);
        console.log("data fetched in view: ", data);
        setContest(data);
      } catch (err) {
        console.log("failed fetching conttest by id");
        setError(err.message);
      }
    };

    getContest();
  }, [contestId, fetchContestById]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!contest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{contest.contestName}</h1>
      <p>
        <strong>Duration:</strong> {contest.duration}
      </p>
      <p>
        <strong>Start Time:</strong>{" "}
        {new Date(contest.startTime).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>
      <p>
        <strong>End Time:</strong>{" "}
        {new Date(contest.endTime).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>
      <p>
        <strong>Created by:</strong> {contest.createdBy.username}
      </p>

      <div className="mt-4 pl-10 pr-10">
        <h2 className="text-xl font-semibold mb-2">Problems</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
            </tr>
          </thead>
          <tbody className="bg-red-300 divide-y divide-gray-200 text-black">
            {contest.problems.map((problem, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{problem.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewContest;
