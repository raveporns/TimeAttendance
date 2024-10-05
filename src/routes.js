import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Summary from "./pages/Summary";
import Leave from "./pages/Leave";
import Leave_history from "./pages/Leave_history";
import Checktime from "./pages/Checktime";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/leave/history" element={<Leave_history />} />
      <Route path="/checktime" element={<Checktime />} />
      
    </Routes>
  );
};

export default AppRoutes;
