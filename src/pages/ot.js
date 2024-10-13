import React from "react";
import { useLocation, Link } from "react-router-dom"; // Import Link here
import Header from "../components/header";
import "../css/header.css";
import "../css/button.css";
import "../css/ot.css";

const OvertimeComponent = () => {
  const location = useLocation();
  const { overtimeEntries } = location.state || { overtimeEntries: [] };

  return (
    <div>
      <Header />
      <div className="col-3 bg-light p-3 border">
        <h2>ข้อมูลการทํางานล่วงเวลา</h2>
        <div className="ot-container">
          <div className="navigation-links-ot">
            <Link to="/ot" className="btn-ot">
              การทํางานล่วงเวลา
            </Link>
            <Link to="/othistory" className="btn-ot">
              ข้อมูลการทํางานล่วงเวลา
            </Link>
            <Link to="/home" className="btn-ot">
              กลับสู่หน้าหลัก
            </Link>
          </div>
        </div>
      </div>
      {/* Display the overtime data in a table */}
      {overtimeEntries.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ชื่อพนักงาน</th>
              <th>วันและเวลาเริ่มต้น</th>
              <th>วันและเวลาสิ้นสุด</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {overtimeEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.employeeName}</td>
                <td>{entry.startTime}</td>
                <td>{entry.endTime}</td>
                <td>{entry.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>ไม่มีข้อมูลการทํางานล่วงเวลา</p>
      )}
    </div>
  );
};

export default OvertimeComponent;
