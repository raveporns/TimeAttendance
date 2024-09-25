// src/routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Summary from "./pages/Summary";
import Leave from "./pages/Leave";
import Checktime from "./pages/Checktime";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/checktime" element={<Checktime />} />
    </Routes>
  );
};

export default AppRoutes;
