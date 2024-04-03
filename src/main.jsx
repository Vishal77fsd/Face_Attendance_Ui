import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register.jsx";
import Employees from "./components/Employees.jsx";
import Attendance from "./components/Attendance.jsx";
import EditEmployee from "./components/EditEmployee.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./components/Login.jsx";

console.log(import.meta.env.VITE_APP_BASE);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EditEmployee />} />
        <Route exact path="/employees/attendance" element={<Attendance />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
