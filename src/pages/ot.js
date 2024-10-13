import React, { useState } from "react";
import "../css/header.css";
import "../css/button.css";
import "../css/ot.css";
import { Link } from "react-router-dom";
import Header from "../components/header";

const OvertimeComponent = () => {
  const [overtimeEntries, setOvertimeEntries] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [details, setDetails] = useState("");

  // รายชื่อพนักงาน (คุณสามารถเปลี่ยนแปลงข้อมูลตามที่ต้องการ)
  const employees = [
    "พนักงาน 1",
    "พนักงาน 2",
    "พนักงาน 3",
    "พนักงาน 4",
    "พนักงาน 5"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (employeeName && startDate && startTime && endTime) {
      if (new Date(`${startDate}T${startTime}`) >= new Date(`${startDate}T${endTime}`)) {
        alert("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น!");
        return;
      }

      const newEntry = { employeeName, startDate, startTime, endTime, details };
      setOvertimeEntries([...overtimeEntries, newEntry]);
      clearForm();
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
    }
  };

  const clearForm = () => {
    setEmployeeName("");
    setStartDate("");
    setStartTime("");
    setEndTime("");
    setDetails("");
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
                state: { overtimeEntries },
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
              <label htmlFor="employeeName" className="label-ot">ชื่อพนักงาน:</label>
              <select
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              >
                <option value="">-- เลือกชื่อพนักงาน --</option>
                {employees.map((employee, index) => (
                  <option key={index} value={employee}>
                    {employee}
                  </option>
                ))}
              </select>

              <label htmlFor="startDate" className="label-ot">วันที่:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />

              <label htmlFor="startTime" className="label-ot">เวลาเริ่มต้น:</label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />

              <label htmlFor="endTime" className="label-ot">เวลาสิ้นสุด:</label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />

              <label htmlFor="details" className="label-ot">รายละเอียด:</label>
              <textarea
                id="details"
                rows="3"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
              <br />
              <button type="submit" className="btn-submit">
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
