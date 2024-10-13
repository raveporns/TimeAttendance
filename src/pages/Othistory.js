import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";
import "../css/header.css";
import "../css/button.css";
import "../css/ot_history.css";

const OvertimeHistory = () => {
  const location = useLocation();
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate(); // เพิ่มการนำทาง

  // ดึงข้อมูลการทำงานล่วงเวลาทั้งหมดเมื่อ component ถูก mount
  useEffect(() => {
    const fetchOvertimeEntries = async () => {
      try {
        const response = await axios.get("http://localhost:8082/overtime/all");
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching overtime entries:", error);
      }
    };

    fetchOvertimeEntries();
  }, []);

  // ฟังก์ชันสำหรับลบข้อมูล
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/overtime/${id}`);
      setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id)); // อัปเดต state
      alert(`ลบข้อมูลที่ ID: ${id}`);
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
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
                  <tr key={entry.id}>
                    <td>{entry.employeeName}</td>
                    <td>{entry.date}</td>
                    <td>{entry.start_time}</td>
                    <td>{entry.end_time}</td>
                    <td>{entry.totalTime}</td>
                    <td>{entry.note}</td>
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
