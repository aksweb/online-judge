import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/Profile";
import CreateContest from "./components/CreateContest";
import { AuthProvider } from "./components/auth/AuthContext";
import Contest from "./components/Contest";
import ViewContest from "./components/ViewContest";
import Problem from "./components/ProblemList";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-slate-400 text-slate-50 min-h-screen">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<CreateContest />} />
            <Route path="/contest" element={<Contest />} />
            <Route path="/view/:contestId" element={<ViewContest />} />
            <Route path="/problems" element={<Problem />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
