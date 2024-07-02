import React, { useEffect, useState, useContext } from "react";
import { Editor } from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./auth/AuthContext";
import CodeModal from "./CodeModal";

const ProblemPage = () => {
  const { param1, param2 } = useParams();
  const { contestId, index } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [prob, setProb] = useState("");
  const [ipath, setIpath] = useState("");
  const [opath, setOpath] = useState("");
  const [pretestIp, setPretestIp] = useState("");
  const [submissions, setSubmissions] = useState([]); // State to store submissions
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const getProblem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/${contestId}/${index}`
        );
        setProb(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    getProblem();
  }, [contestId, index]);

  const handleRunCode = async () => {
    try {
      setOutput("Running code...");
      setPretestIp(prob.testCases);
      const response = await axios.post("http://localhost:3000/run", {
        language,
        code,
        pretestIp,
      });

      if (response.data.code) {
        setOutput(response.data.error);
      } else {
        setOutput(response.data.output);
      }
    } catch (error) {
      const parsedErr = JSON.parse(error.request.response);
      setOutput(`Error: ${parsedErr.error}`);
    }
  };

  const handleViewSubmission = async () => {
    try {
      const email = auth.userEmail;
      const response = await axios.get(
        `http://localhost:3000/submissions/${contestId}/${index}?email=${email}`
      );

      // Sort submissions by dateTime in descending order
      const sortedSubmissions = response.data.submissions.sort(
        (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
      );

      setSubmissions(sortedSubmissions);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    }
  };

  const handleSubmitCode = async () => {
    if (auth) {
      try {
        setOutput("Submitting code...");
        setIpath(prob.inputFile);
        setOpath(prob.outputFile);

        const email = auth.userEmail;
        const response = await axios.post("http://localhost:3000/submit", {
          language,
          code,
          ipath,
          opath,
          contestId,
          index,
          email,
        });

        if (response.data.message === "Accepted") {
          setOutput("Accepted");
        } else {
          setOutput(
            `Wrong Answer \nExpected Output:\n${response.data.expectedOutput} \nReceived Output:\n${response.data.receivedOutput}`
          );
        }
      } catch (err) {
        console.error("Submission error:", err);
      }
    } else {
      alert("Please login to make submission.");
    }
  };

  const handleShowCode = (code) => {
    setSelectedCode(code);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCode("");
  };

  return (
    <div className="flex h-screen text-black">
      {modalOpen && <CodeModal code={selectedCode} closeModal={closeModal} />}
      <div className="w-2/5 border-r border-gray-300 p-4">
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "description" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => {
              setActiveTab("description");
              console.log(auth);
            }}
          >
            Description
          </button>

          {auth && (
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === "submissions" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => {
                setActiveTab("submissions");
                handleViewSubmission(); // Fetch submissions when switching to Submissions tab
              }}
            >
              Submissions
            </button>
          )}
        </div>
        <div className={activeTab === "description" ? "block" : "hidden"}>
          <h2 className="text-xl font-bold mb-2">{prob.name}</h2>
          <h2 className="text-xl font-bold mb-2">Problem Description</h2>
          <p style={{ whiteSpace: "pre-line" }}>{prob.description}</p>
          <h3 className="text-xl font-bold mb-2">Test Cases</h3>
          <h4 className="text-xl font-bold mb-2">Sample Input</h4>
          <p style={{ whiteSpace: "pre-line" }}>{prob.testCases}</p>
          <h4 className="text-xl font-bold mb-2">Sample Output</h4>
          <p style={{ whiteSpace: "pre-line" }}>{prob.expectedOutputs}</p>
          <h3 className="text-xl font-bold mb-2">Constraints</h3>
        </div>

        <div className={activeTab === "submissions" ? "block" : "hidden"}>
          <h2 className="text-xl font-bold mb-2">Submissions</h2>
          {submissions.length === 0 ? (
            <p>No submissions found.</p>
          ) : (
            submissions.map((submission, index) => (
              <div key={index} className="border border-gray-300 p-2 mb-4">
                <div>
                  <strong>Result:</strong> {submission.result}
                </div>
                <div>
                  <strong>Message:</strong> {submission.message}
                </div>
                <div>
                  <strong>Date & Time:</strong>{" "}
                  {new Date(submission.dateTime).toLocaleString()}
                </div>
                <div>
                  <strong>View Code:</strong>{" "}
                  <button
                    className="text-blue-500"
                    onClick={() => handleShowCode(submission.code)}
                  >
                    View
                  </button>
                </div>
                {submission.result !== "ACC" && (
                  <div>
                    <strong>Received Output:</strong>{" "}
                    {submission.receivedOutput}
                  </div>
                )}
                {submission.result !== "ACC" && (
                  <div>
                    <strong>Expected Output:</strong>{" "}
                    {submission.expectedOutput}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="w-3/5 flex flex-col p-4">
        <div className="mb-2">
          <select
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>
        <Editor
          height="70vh"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            selectOnLineNumbers: true,
            automaticLayout: true,
          }}
        />
        <div className="flex mt-2">
          <button
            className="flex-1 py-2 px-4 bg-blue-500 text-white rounded mr-2"
            onClick={handleRunCode}
          >
            Run
          </button>
          <button
            className="flex-1 py-2 px-4 bg-blue-500 text-white rounded"
            onClick={handleSubmitCode}
          >
            Submit
          </button>
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-bold">Output</h3>
          <pre className="p-2 border border-gray-300 rounded bg-gray-100 whitespace-pre-wrap max-h-40 overflow-y-auto">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
