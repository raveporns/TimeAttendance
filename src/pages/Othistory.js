import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import mockOvertimeEntries from "../mockup/mockup_ot_history";
import Header from "../components/header";
import "../css/header.css";
import "../css/button.css";
import "../css/ot_history.css";

const OvertimeHistory = () => {
  const location = useLocation();
  const { overtimeEntries } = location.state || { overtimeEntries: [] };

  // ใช้ข้อมูล mock-up หากไม่มีข้อมูล
  const [entries, setEntries] = useState(overtimeEntries.length > 0 ? overtimeEntries : mockOvertimeEntries);
  const [editEntryId, setEditEntryId] = useState(null); // ID ของข้อมูลที่กำลังจะแก้ไข

  // ฟังก์ชันสำหรับลบข้อมูล
  const handleDelete = (id) => {
    const newEntries = entries.filter((entry) => entry.id !== id);
    setEntries(newEntries);
    alert(`ลบข้อมูลที่ ID: ${id}`);
  };

  // ฟังก์ชันสำหรับเริ่มการแก้ไขข้อมูล
  const handleEdit = (id) => {
    setEditEntryId(id); // ตั้งค่า ID ของข้อมูลที่กำลังจะแก้ไข
  };

  // ฟังก์ชันสำหรับบันทึกการแก้ไข
  const handleSaveEdit = () => {
    setEditEntryId(null); // รีเซ็ต ID ของการแก้ไข
  };

  // ฟังก์ชันสำหรับการเปลี่ยนแปลงข้อมูลในฟอร์มแก้ไข
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, [name]: value } : entry // สร้างอ็อบเจกต์ใหม่สำหรับแถวที่กำลังแก้ไข
      )
    );
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
          <div className="overtime-table-container"> {/* container สำหรับการเลื่อน */}
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
                      {editEntryId === entry.id ? (
                        <>
                          {/* ฟอร์มแก้ไข */}
                          <td>
                            <input
                              type="text"
                              name="employeeName"
                              value={entry.employeeName}
                              onChange={(e) => handleChange(e, entry.id)}
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              name="date"
                              value={entry.date}
                              onChange={(e) => handleChange(e, entry.id)}
                            />
                          </td>
                          <td>
                            <input
                              type="time"
                              name="startTime"
                              value={entry.startTime}
                              onChange={(e) => handleChange(e, entry.id)}
                            />
                          </td>
                          <td>
                            <input
                              type="time"
                              name="endTime"
                              value={entry.endTime}
                              onChange={(e) => handleChange(e, entry.id)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="totalTime"
                              value={entry.totalTime}
                              onChange={(e) => handleChange(e, entry.id)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="details"
                              value={entry.details}
                              onChange={(e) => handleChange(e, entry.id)}
                            />
                          </td>
                          <td>
                            <button className="saveButton" onClick={handleSaveEdit}>บันทึก</button>
                            <button
                              style={{
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                              }}
                              onClick={() => setEditEntryId(null)}
                            >
                              ยกเลิก
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">ไม่มีข้อมูลการทำงานล่วงเวลา</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div> {/* ปิด div ของ overtime-table-container */}
        </div>
      </div>
    </div>
  );
};

export default OvertimeHistory;
