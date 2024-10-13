import React from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/header";
import "../css/header.css";
import "../css/button.css";
import "../css/ot_history.css";

const OvertimeHistory = () => {
  const location = useLocation();
  const { overtimeEntries } = location.state || { overtimeEntries: [] }; // ตรวจสอบข้อมูล

  // ฟังก์ชันสำหรับลบข้อมูล
  const handleDelete = (index) => {
    alert(`ลบข้อมูลที่ ${index}`);
  };

  // ฟังก์ชันสำหรับแก้ไขข้อมูล
  const handleEdit = (index) => {
    alert(`แก้ไขข้อมูลที่ ${index}`);
  };

  return (
    <div>
      <Header />
      <div className="d-flex">
        <div className="col-3 bg-light p-3 border">
          <div className="ot-container">
            <div className="navigation-links-ot">
              <Link to="/ot" className="btn-ot">การทำงานล่วงเวลา</Link>
              <Link to="/othistory" className="btn-ot">ข้อมูลการทำงานล่วงเวลา</Link>
              <Link to="/home" className="btn-ot">กลับสู่หน้าหลัก</Link>
            </div>
          </div>
        </div>

        {/* ตารางแสดงข้อมูลการทำงานล่วงเวลา */}
        <div className="col-sm-9 bg-light p-3 border">
          <h2 className="table-title">ข้อมูลการทำงานล่วงเวลา</h2>
          <table className="overtime-table">
            <thead>
              <tr>
                <th>ชื่อพนักงาน</th>
                <th>เริ่มต้น</th>
                <th>สิ้นสุด</th>
                <th>รายละเอียด</th>
                <th>จัดการ</th> {/* เพิ่มหัวข้อจัดการ */}
              </tr>
            </thead>
            <tbody>
              {overtimeEntries.length > 0 ? (
                overtimeEntries.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.employeeName}</td>
                    <td>{entry.startTime}</td>
                    <td>{entry.endTime}</td>
                    <td>{entry.details}</td>
                    <td>
                      <button className="editButton" onClick={() => handleEdit(index)}>แก้ไข</button>
                      <button className="deleteButton" onClick={() => handleDelete(index)}>ลบ</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    ไม่มีข้อมูลการทำงานล่วงเวลา
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OvertimeHistory;
