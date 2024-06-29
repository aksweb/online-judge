import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";

const CreateContest = () => {
  const initialProblemState = {
    name: "",
    description: "",
    constraints: "",
    complexity: "",
    testCases: "",
    expectedOutputs: "",
    images: [],
    inputFile: null, // New state for input.txt file
    outputFile: null, // New state for output.txt file
  };

  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([initialProblemState]);
  const [contestName, setContestName] = useState("");
  const [duration, setDuration] = useState("");
  const [endtime, setEndtime] = useState("");
  const [starttime, setStarttime] = useState("");
  const [error, setError] = useState(""); // Add this line
  const { auth, createPost } = useContext(AuthContext);

  const addProblem = () => {
    setProblems([...problems, { ...initialProblemState }]);
  };

  const handleProblemChange = (index, event) => {
    const { name, value, files } = event.target;
    if (name === "inputFile") {
      const updatedProblems = [...problems];
      updatedProblems[index].inputFile = files[0];
      setProblems(updatedProblems);
    } else if (name === "outputFile") {
      const updatedProblems = [...problems];
      updatedProblems[index].outputFile = files[0];
      setProblems(updatedProblems);
    } else {
      const updatedProblems = [...problems];
      updatedProblems[index] = { ...updatedProblems[index], [name]: value };
      setProblems(updatedProblems);
    }
  };

  const handleImageChange = (index, event) => {
    const files = Array.from(event.target.files);
    const updatedProblems = problems.map((problem, i) =>
      i === index
        ? { ...problem, images: [...problem.images, ...files] }
        : problem
    );
    setProblems(updatedProblems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic form validation
    // if (!contestName || !duration || !endtime || !starttime) {
    //   setError("All fields are .");
    //   return;
    // }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("useremail", auth.userEmail);
    formData.append("contestName", contestName);
    formData.append("duration", duration);
    formData.append("startTime", new Date(starttime).toISOString()); // Ensure date-time format
    formData.append("endTime", new Date(endtime).toISOString());

    problems.forEach((problem, index) => {
      formData.append(`problems[${index}][name]`, problem.name);
      formData.append(`problems[${index}][description]`, problem.description);
      formData.append(`problems[${index}][constraints]`, problem.constraints);
      formData.append(`problems[${index}][complexity]`, problem.complexity);
      formData.append(`problems[${index}][testCases]`, problem.testCases);
      formData.append(
        `problems[${index}][expectedOutputs]`,
        problem.expectedOutputs
      );
      formData.append(`problems[${index}][inputFile]`, problem.inputFile); // Append input.txt file
      formData.append(`problems[${index}][outputFile]`, problem.outputFile); // Append output.txt file
      problem.images.forEach((image, imgIndex) => {
        formData.append(`images-${index}`, image);
      });
    });

    try {
      console.log("before creation: ", formData);
      await createPost(formData);
      // Reset form after successful submission
      setContestName("");
      setDuration("");
      setStarttime("");
      setEndtime("");
      setProblems([initialProblemState]);
      setLoading(false);
      //   Navigate("/");
    } catch (error) {
      setError("Error creating contest. Please try again.");
      setLoading(false);
    }
  };

  if (!auth || auth.adminRole == false) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Contest</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="contestName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contest Name
            </label>
            <input
              type="text"
              id="contestName"
              value={contestName}
              onChange={(e) => setContestName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="duration"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Duration
            </label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="starttime"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Start Date and Time
            </label>
            <input
              type="datetime-local"
              id="starttime"
              value={starttime}
              onChange={(e) => setStarttime(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="endtime"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Schedule Date and Time
            </label>
            <input
              type="datetime-local"
              id="endtime"
              value={endtime}
              onChange={(e) => setEndtime(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        {problems.map((problem, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Problem {index + 1}</h3>
            <div className="grid gap-6">
              <div>
                <label
                  htmlFor={`name-${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Problem Name
                </label>
                <input
                  type="text"
                  id={`name-${index}`}
                  name="name"
                  value={problem.name}
                  onChange={(e) => handleProblemChange(index, e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor={`description-${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Problem Description
                </label>
                <textarea
                  id={`description-${index}`}
                  name="description"
                  value={problem.description}
                  onChange={(e) => handleProblemChange(index, e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none overflow-hidden"
                  rows="4"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor={`inputFile-${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Input File (input.txt)
                </label>
                <input
                  type="file"
                  id={`inputFile-${index}`}
                  name="inputFile"
                  onChange={(e) => handleProblemChange(index, e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor={`outputFile-${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Output File (output.txt)
                </label>
                <input
                  type="file"
                  id={`outputFile-${index}`}
                  name="outputFile"
                  onChange={(e) => handleProblemChange(index, e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor={`testCases-${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Test Cases
                </label>
                <textarea
                  id={`testCases-${index}`}
                  name="testCases"
                  value={problem.testCases}
                  onChange={(e) => handleProblemChange(index, e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none overflow-hidden"
                  rows="4"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor={`expectedOutputs-${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Expected Outputs
                </label>
                <textarea
                  id={`expectedOutputs-${index}`}
                  name="expectedOutputs"
                  value={problem.expectedOutputs}
                  onChange={(e) => handleProblemChange(index, e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none overflow-hidden"
                  rows="4"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addProblem}
          className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Problem
        </button>
        <button
          type="submit"
          className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none dark:focus:ring-green-800"
        >
          Create Contest
        </button>
      </form>
    </div>
  );
};

export default CreateContest;
