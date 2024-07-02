import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState(null);
  const { problemsFromExpiredContests } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getProblems = async () => {
      try {
        const fetchedProblems = await problemsFromExpiredContests();
        console.log(fetchedProblems);
        setProblems(fetchedProblems);
      } catch (err) {
        setError(err.message);
      }
    };

    getProblems();
  }, [problemsFromExpiredContests]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (problems.length === 0) {
    return <div>Loading...</div>;
  }

  const handleSolveNow = (contestId, idx) => {
    navigate(`/problem/${contestId}/${idx}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mt-4 pl-10 pr-10">
        <h2 className="text-xl font-semibold mb-2 text-black">
          Problems from Past Contests
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Problem Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contest Name
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-black">
            {problems.map((problem, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    onClick={() => console.log("clicked")}
                    className="hover:underline hover:text-blue-500"
                  >
                    {problem.problemName}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {problem.contestName}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(problem.endTime).toLocaleString()}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() =>
                      handleSolveNow(problem.contestId, problem.idx)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                  >
                    Solve Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemsList;
