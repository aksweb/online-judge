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
    <>
      <h1 className="nabla-unique styl">Practice Zone</h1>

      <div className="container mx-auto p-4">
        <div className="mt-4 pl-2 pr-2 md:pl-10 md:pr-10">
          <h2 className="text-3xl font-semibold mb-6  text-black">
            Problems from Past Contests
          </h2>
          <div className="shadow-md bg-white rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 table-auto">
                <caption class="text-center text-black">
                  Try these questions. All the best👍
                </caption>
                <thead className="bg-gray-50">
                  <tr className="text-left">
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Problem Name
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Contest Name
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-black">
                  {problems.map((problem, index) => (
                    <tr key={index} className="text-left">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          onClick={() => console.log("clicked")}
                          className="hover:underline hover:text-blue-500 cursor-pointer"
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
                <tfoot>
                  <tr>
                    <td colspan="5" class="text-center text-red-950 font-bold">
                      Problems of ongoing contest would be shown here and will
                      be ready for submission after contest.
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemsList;
