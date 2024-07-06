import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CreateContest from "./components/CreateContest";
import { AuthProvider } from "./components/auth/AuthContext";
import Contest from "./components/Contest";
import ViewContest from "./components/ViewContest";
import Problem from "./components/ProblemList";
import ProblemPage from "./components/ProblemPage";
import Clock from "./components/Clock";
import Dashboard from "./components/Dashboard";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gradient-to-b from-rose-50 to-rose-100 text-slate-50 min-h-screen ">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateContest />} />
            <Route path="/contest" element={<Contest />} />
            <Route path="/view/:contestId" element={<ViewContest />} />
            <Route path="/problems" element={<Problem />} />
            {/* <Route path="/problempage" element={<ProblemPage />} /> */}
            <Route
              path="/problem/:contestId/:index"
              element={<ProblemPage />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Clock />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
