import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import "../css/summary.css";
import monthData from "../mockup/mockup_summary";

const Summary = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [searched, setSearched] = useState(false); // State to check if search button is clicked

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setSelectedMonth("");
    setSearched(false); // Reset search state when year changes
  };

  const handleSearch = () => {
    setSearched(true); // Trigger search when button is clicked
  };

  const renderTableRows = () => {
    if (!searched) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            กรุณากดค้นหาเพื่อดูข้อมูล
          </td>
        </tr>
      );
    }

    if (!selectedMonth) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            กรุณาเลือกเดือนเพื่อดูข้อมูล
          </td>
        </tr>
      );
    }

    return monthData[selectedYear][selectedMonth].map((data, index) => (
      <tr key={index}>
        <td>{data.empId}</td>
        <td>{data.first}</td>
        <td>{data.last}</td>
        <td>{data.date}</td>
        <td>{data.late}</td>
        <td>{data.leave}</td>
        <td>{data.overtime}</td>
      </tr>
    ));
  };

  return (
    <div>
      <Header />

      <div className="summary-container">
        <div className="col-3 bg-light p-3 border">
          <div className="set-color">
            <div className="mb-3">
              <label htmlFor="yearSelect" className="form-label">
                เลือกปี:
              </label>
              <select
                id="yearSelect"
                className="form-select"
                onChange={handleYearChange}
                value={selectedYear}
              >
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="monthSelect" className="form-label">
                เลือกเดือน:
              </label>
              <select
                id="monthSelect"
                className="form-select"
                onChange={handleMonthChange}
                value={selectedMonth}
              >
                <option value="">เลือกเดือน</option>
                {Object.keys(monthData[selectedYear]).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* ปุ่มค้นหา */}
            <div className="mb-3">
              
              <button className="btn-back" onClick={handleSearch}>
                ค้นหา
              </button>
            </div>

            {/* ปุ่มกลับสู่หน้าหลัก */}
            <div className="mb-3">
              <div className="square-back">
                <Link to="/" className="btn-back">
                  กลับสู่หน้าหลัก
                </Link>
              </div>
            </div>
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
              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
