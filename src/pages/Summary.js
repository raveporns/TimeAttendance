import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import axios from "axios"; // เพิ่ม axios สำหรับการเรียก API
import axios from "axios"; // เพิ่ม axios สำหรับการเรียก API
import "../css/summary.css";

const Summary = () => {
  const [monthData, setMonthData] = useState([]);
  const [searched, setSearched] = useState(false);

  // ฟังก์ชันดึงข้อมูลเมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8082/reports/all"); // ดึงข้อมูลทั้งหมด
        const data = response.data;

        if (data.length === 0) {
          alert("ไม่พบข้อมูล");
          setMonthData([]); // Reset data
        } else {
          setMonthData(data);
        }
        setSearched(true);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchData();
  }, []);

  const renderTableRows = () => {
    if (!searched) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            กำลังโหลดข้อมูล...
          </td>
        </tr>
      );
    }

    if (monthData.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            ไม่พบข้อมูล
          </td>
        </tr>
      );
    }

    return monthData.map((data, index) => (
      <tr key={index}>
        <td>{data.employee_id}</td>
        <td>{data.employee_name}</td>
        <td>{data.employee_lastname}</td>
        <td>{parseFloat(data.working_day).toFixed(1)}</td>
        <td>{data.working_late}</td>
        <td>{data.working_leave}</td>
        <td>{data.working_OT}</td>
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
              <Link to="/" className="btn-back">
                กลับสู่หน้าหลัก
              </Link>
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
