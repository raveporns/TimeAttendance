import React, { useState } from "react";
import "../css/header.css";
import "../css/button.css";
import "../css/ot.css";
import { Link } from "react-router-dom";
import Header from "../components/header";

const OvertimeComponent = () => {
  const [overtimeEntries, setOvertimeEntries] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (employeeName && startTime && endTime) {
      const newEntry = { employeeName, startTime, endTime, details };
      setOvertimeEntries([...overtimeEntries, newEntry]);
      setEmployeeName("");
      setStartTime("");
      setEndTime("");
      setDetails("");
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
    }
  };

  return (
    <div>
      <Header />
      <div className="ot-his-content">
        <div className="col-3 bg-light p-3 border">
          <div className="navigation-links-othis">
            <Link to="/ot" className="btn-othis">
              การทำงานล่วงเวลา
            </Link>
            <Link
              to={{
                pathname: "/othistory",
                state: { overtimeEntries }, // ส่ง overtimeEntries ไปยัง Othistory.js
              }}
              className="btn-othis"
            >
              ข้อมูลการทำงานล่วงเวลา
            </Link>
            <Link to="/home" className="btn-othis">
              กลับสู่หน้าหลัก
            </Link>
          </div>
        </div>

        <div className="col-sm-9 bg-light p-3 border">
          <div className="ot-content">
            <form onSubmit={handleSubmit}>
              <h1>บันทึกการทำงานล่วงเวลา</h1>
              <label htmlFor="employeeName" className="lable-ot">ชื่อพนักงาน:</label>
              <input
                type="text"
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              />

              <label htmlFor="startTime" className="lable-ot">วันและเวลาเริ่มต้น:</label>
              <input
                type="datetime-local"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />

              <label htmlFor="endTime" className="lable-ot">วันและเวลาสิ้นสุด:</label>
              <input
                type="datetime-local"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />

              <label
                htmlFor="details"
                style={{ display: "block", margin: "10px 0 5px" }}
              >
                รายละเอียด:
              </label>
              <textarea
                id="details"
                rows="3"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
              <br></br>
              <button
                type="submit"
              >
                บันทึกการทำงานล่วงเวลา
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvertimeComponent;
