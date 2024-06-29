import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./auth/AuthContext";

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState(null);
  const { problemsFromExpiredContests } = useContext(AuthContext);

  useEffect(() => {
    const getProblems = async () => {
      try {
        const fetchedProblems = await problemsFromExpiredContests();
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

  return (
    <div className="container mx-auto p-4">
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
          <tbody className="bg-white divide-y divide-gray-200 text-black">
            {problems.map((problem, index) => (
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

export default ProblemsList;
