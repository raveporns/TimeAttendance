import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Summary from "./pages/Summary";
import OvertimeComponent from './pages/Ot';
import OvertimeHistory from './pages/Othistory';
import Checktime from "./pages/Checktime";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/ot" element={<OvertimeComponent />} />
      <Route path="/othistory" element={<OvertimeHistory />} />
      <Route path="/checktime" element={<Checktime />} />
      
    </Routes>
  );
};

export default AppRoutes;
