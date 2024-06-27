import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Nav from "./components/Nav";
const App = () => {
  return (
    <div className="bg-black text-slate-50 ">
      <Nav />
    </div>
  );
};

export default App;
