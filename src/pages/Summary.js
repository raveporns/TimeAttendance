import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import "../css/summary.css";

const Summary = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [searched, setSearched] = useState(false);
  const [monthData, setMonthData] = useState([]); // State for fetched data

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setSelectedMonth("");
    setSearched(false); // Reset search state when year changes
  };

  const handleSearch = async () => {
    if (!selectedMonth) {
      alert("กรุณาเลือกเดือนเพื่อดูข้อมูล");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:8082/reports/${selectedYear}/${selectedMonth}`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Data from API:", data); // ตรวจสอบค่าที่ได้รับจาก API
  
      if (data.length === 0) {
        alert("ไม่พบข้อมูลสำหรับเดือนนี้");
      } else {
        setMonthData(data);
      }
      setSearched(true);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
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

    if (monthData.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            ไม่พบข้อมูลสำหรับเดือนนี้
          </td>
        </tr>
      );
    }

    return monthData.map((data, index) => (
      <tr key={index}>
        <td>{data.employee_id}</td>
        <td>{data.employee_name}</td>
        <td>{data.employee_lastname}</td>
        <td>{data.working_day.toFixed(2)}</td>
        <td>{data.working_late.toFixed(2)}</td>
        <td>{data.working_leave.toFixed(2)}</td>
        <td>{data.working_OT.toFixed(2)}</td>
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
                <option value="1">มกราคม</option>
                <option value="2">กุมภาพันธ์</option>
                <option value="3">มีนาคม</option>
                <option value="4">เมษายน</option>
                <option value="5">พฤษภาคม</option>
                <option value="6">มิถุนายน</option>
                <option value="7">กรกฎาคม</option>
                <option value="8">สิงหาคม</option>
                <option value="9">กันยายน</option>
                <option value="10">ตุลาคม</option>
                <option value="11">พฤศจิกายน</option>
                <option value="12">ธันวาคม</option>
                <option value="13">ทั้งหมด</option>
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
