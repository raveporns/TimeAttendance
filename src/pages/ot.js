import React, { useState, useEffect } from "react";
import "../css/header.css";
import "../css/button.css";
import "../css/ot.css";
import { Link } from "react-router-dom";
import Header from "../components/header";
import axios from "axios";

const OvertimeComponent = () => {
  const [overtimeEntries, setOvertimeEntries] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [details, setDetails] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8082/employees/all");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (employeeId && startDate && startTime && endTime) {
      const startTimeFormatted = startTime; // ใช้รูปแบบ HH:MM
      const endTimeFormatted = endTime; // ใช้รูปแบบ HH:MM

      const startDateTime = new Date(`${startDate}T${startTimeFormatted}:00`);
      const endDateTime = new Date(`${startDate}T${endTimeFormatted}:00`);

      if (startDateTime >= endDateTime) {
        alert("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น!");
        return;
      }

      const allTime = (endDateTime - startDateTime) / (1000 * 60 * 60); // แปลงเป็นชั่วโมง

      const newEntry = {
        employee_id: employeeId,
        date: startDate, // รูปแบบ YYYY-MM-DD
        start_time: startTimeFormatted,
        end_time: endTimeFormatted,
        alltime: allTime, // แปลงเป็น float
        note: details,
      };

      console.log("New Entry: ", newEntry); // ตรวจสอบข้อมูลที่ส่งไป

      try {
        const response = await axios.post(
          "http://localhost:8082/overtime",
          newEntry
        );
        if (response.status === 200) {
          alert("บันทึกข้อมูลเรียบร้อยแล้ว");
          setOvertimeEntries([...overtimeEntries, response.data]);
          clearForm();
        }
      } catch (error) {
        console.error("Error saving overtime data:", error);
        if (error.response) {
          console.log("Response Data:", error.response.data);
          alert(`เกิดข้อผิดพลาด: ${error.response.data.error}`);
        } else {
          alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
    }
  };

  const clearForm = () => {
    setEmployeeId("");
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
            <Link to="/othistory" className="btn-othis">
              ข้อมูลการทำงานล่วงเวลา
            </Link>
            <Link to="/home" className="btn-othis">กลับสู่หน้าหลัก</Link>
          </div>
        </div>

        <div className="col-sm-9 bg-light p-3 border">
          <div className="ot-content">
            <form onSubmit={handleSubmit}>
              <h1>บันทึกการทำงานล่วงเวลา</h1>
              <label htmlFor="employeeName" className="label-ot">
                ชื่อพนักงาน:
              </label>
              <select
                id="employeeName"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              >
                <option value="">-- เลือกชื่อพนักงาน --</option>
                {employees.map((employee) => (
                  <option
                    key={employee.employee_id}
                    value={employee.employee_id}
                  >
                    {employee.employee_name} {employee.employee_lastname}
                  </option>
                ))}
              </select>

              <label htmlFor="startDate" className="label-ot">
                วันที่:
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />

              <label htmlFor="startTime" className="label-ot">
                เวลาเริ่มต้น:
              </label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />

              <label htmlFor="endTime" className="label-ot">
                เวลาสิ้นสุด:
              </label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />

              <label htmlFor="details" className="label-ot">
                รายละเอียด:
              </label>
              <textarea
                id="details"
                rows="3"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
              <br />
              <button type="submit" className="btn-submit">บันทึกการทำงานล่วงเวลา</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvertimeComponent;
