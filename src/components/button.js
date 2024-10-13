import React from "react";
import { Link } from "react-router-dom";
import "../css/button.css";

const Button = () => {
  return (
    <div className="btn-all">
      <div className="d-grid">
        <Link to="/checktime" className="btn">
          การเข้า-ออกงาน
        </Link>
<<<<<<< Updated upstream
        <Link to="/leave" className="btn">
          บันทึกการทำงานล่วงเวลา
=======
        <Link to="/othistory" className="btn">
          การทํางานล่วงเวลา
>>>>>>> Stashed changes
        </Link>
        <Link to="/summary" className="btn">
          การรายงานผล
        </Link>
      </div>
    </div>
  );
};

export default Button;
