import React, { useState } from "react";
import Header from "../components/header";
import "../css/summary.css";
import monthData from "../mockup/mockup_summary"; // นำเข้าข้อมูล mockup

const Summary = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setSelectedMonth(""); // Reset month selection
  };

  return (
    <div>
      <Header />

      <div className="summary-container">
        <div className="col-3 bg-light p-3 border">
          <div className="mb-3">
            <label htmlFor="yearSelect" className="form-label">เลือกปี:</label>
            <select id="yearSelect" className="form-select" onChange={handleYearChange} value={selectedYear}>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="monthSelect" className="form-label">เลือกเดือน:</label>
            <select id="monthSelect" className="form-select" onChange={handleMonthChange} value={selectedMonth}>
              <option value="">เลือกเดือน</option>
              {Object.keys(monthData[selectedYear]).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-sm-9 bg-light p-3 border">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">รหัสพนักงาน</th>
                  <th scope="col">ชื่อ</th>
                  <th scope="col">นามสกุล</th>
                  <th scope="col">วันที่มาทำงาน(วัน)</th>
                  <th scope="col">มาสาย(วัน)</th>
                  <th scope="col">ลา/ขาด(วัน)</th>
                  <th scope="col">ทำงานล่วงเวลา(ชั่วโมง)</th>
                </tr>
              </thead>
              <tbody>
                {selectedMonth && monthData[selectedYear][selectedMonth].map((data, index) => (
                  <tr key={index}>
                    <td>{data.empId}</td>
                    <td>{data.first}</td>
                    <td>{data.last}</td>
                    <td>{data.date}</td>
                    <td>{data.late}</td>
                    <td>{data.leave}</td>
                    <td>{data.overtime}</td>
                  </tr>
                ))}
                {!selectedMonth && (
                  <tr>
                    <td colSpan="7" className="text-center">
                      กรุณาเลือกเดือนเพื่อดูข้อมูล
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
