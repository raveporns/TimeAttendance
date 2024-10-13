import React, { useEffect, useState } from "react"; 
import { useLocation, Link, useNavigate } from "react-router-dom";
import mockOvertimeEntries from "../mockup/mockup_ot_history";
import Header from "../components/header";
import "../css/header.css";
import "../css/button.css";
import "../css/ot_history.css";

const OvertimeHistory = () => {
  const location = useLocation();
  const navigate = useNavigate(); // เพิ่มการกำหนด navigate
  const { overtimeEntries } = location.state || { overtimeEntries: [] }; // ตรวจสอบข้อมูล

  // ใช้ข้อมูล mock-up หากไม่มีข้อมูล
  const [entries, setEntries] = useState(overtimeEntries.length > 0 ? overtimeEntries : mockOvertimeEntries);

  // ฟังก์ชันสำหรับลบข้อมูล
  const handleDelete = (id) => {
    const newEntries = entries.filter((entry) => entry.id !== id);
    setEntries(newEntries);
    alert(`ลบข้อมูลที่ ID: ${id}`);
  };

  // ฟังก์ชันสำหรับแก้ไขข้อมูล
  const handleEdit = (id) => {
    navigate(`/overtime/edit/${id}`); // เปลี่ยนเส้นทางไปยังหน้าที่เหมาะสม
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
                <th>วันที่</th>
                <th>เวลาเริ่มต้น</th>
                <th>เวลาสิ้นสุด</th>
                <th>รวมเวลาทั้งหมด</th>
                <th>รายละเอียด</th>
                <th>จัดการ</th> 
              </tr>
            </thead>
            <tbody>
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <tr key={entry.id}> {/* ใช้ entry.id แทน index */}
                    <td>{entry.employeeName}</td>
                    <td>{entry.date}</td>
                    <td>{entry.startTime}</td>
                    <td>{entry.endTime}</td>
                    <td>{entry.totalTime}</td>
                    <td>{entry.details}</td>
                    <td>
                      <button className="editButton" onClick={() => handleEdit(entry.id)}>แก้ไข</button>
                      <button className="deleteButton" onClick={() => handleDelete(entry.id)}>ลบ</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
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
