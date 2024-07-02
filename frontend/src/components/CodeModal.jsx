import React from "react";

const CodeModal = ({ code, closeModal }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center z-10 items-center bg-gray-800 bg-opacity-50">
      <div
        className="bg-white p-4 rounded shadow-md"
        style={{ width: "80%", maxWidth: "800px" }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">View Code</h3>
          <button className="text-red-500" onClick={closeModal}>
            Close
          </button>
        </div>
        <pre
          className="p-2 border border-gray-300 rounded bg-gray-100 whitespace-pre-wrap max-h-80 overflow-y-auto"
          style={{ maxHeight: "600px" }}
        >
          {code}
        </pre>
      </div>
    </div>
  );
};

export default CodeModal;
