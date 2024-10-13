import React, { useEffect, useState } from "react"; 
import { useLocation, Link, useNavigate } from "react-router-dom";
import mockOvertimeEntries from "../mockup/mockup_ot_history";
import Header from "../components/header";
import "../css/header.css";
import "../css/button.css";
import "../css/ot_history.css";

const OvertimeHistory = () => {
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedEntry, setEditedEntry] = useState({});
  const navigate = useNavigate();

  // ฟังก์ชันสำหรับดึงข้อมูลการทำงานล่วงเวลา
  const fetchOvertimeEntries = async () => {
    try {
      const response = await axios.get("http://localhost:8082/overtime/all");
      const updatedEntries = response.data.map((entry) => {
        const startTime = entry.start_time.split(":").map(Number);
        const endTime = entry.end_time.split(":").map(Number);

        const alltimeHours = endTime[0] - startTime[0];
        const alltimeMinutes = endTime[1] - startTime[1];
        const totalMinutes = alltimeHours * 60 + alltimeMinutes;

        return {
          ...entry,
          alltime: totalMinutes >= 0 ? totalMinutes : 0,
        };
      });

      setEntries(updatedEntries);
    } catch (error) {
      console.error("Error fetching overtime entries:", error);
    }
  };

  useEffect(() => {
    fetchOvertimeEntries();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าจะลบข้อมูลนี้?")) {
      try {
        await axios.delete(`http://localhost:8082/overtime/${id}`);
        setEntries((prevEntries) =>
          prevEntries.filter((entry) => entry.OT_id !== id)
        );
        alert(`ลบข้อมูลที่ ID: ${id}`);
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry.OT_id);
    setEditedEntry({
      employee_id: entry.employee_id,
      employee_name: entry.employee_name,
      employee_lastname: entry.employee_lastname,
      date: entry.date,
      start_time: entry.start_time,
      end_time: entry.end_time,
      note: entry.note,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (id) => {
    if (!editedEntry.employee_name || !editedEntry.employee_lastname || !editedEntry.date || !editedEntry.start_time || !editedEntry.end_time) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:8082/overtime/${id}`, editedEntry, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchOvertimeEntries();
      setEditingId(null);
      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
    } catch (error) {
      console.error("Error updating entry:", error);
      alert(`เกิดข้อผิดพลาดในการบันทึกข้อมูล: ${error.response?.data?.message || error.message}`);
    }
  };
  

  return (
    <div>
      <Header />
      <div className="d-flex">
        <div className="col-3 bg-light p-3 border">
          <div className="ot-container">
            <div className="navigation-links-ot">
              <Link to="/ot" className="btn-ot">
                การทำงานล่วงเวลา
              </Link>
              <Link to="/othistory" className="btn-ot">
                ข้อมูลการทำงานล่วงเวลา
              </Link>
              <Link to="/home" className="btn-ot">
                กลับสู่หน้าหลัก
              </Link>
            </div>
          </div>
        </div>

        <div className="col-sm-9 bg-light p-3 border">
          <h2 className="table-title">ข้อมูลการทำงานล่วงเวลา</h2>
          <table className="overtime-table">
            <thead>
              <tr>
                <th>ชื่อพนักงาน</th>
                <th>นามสกุล</th>
                <th>วันที่</th>
                <th>เวลาเริ่มต้น</th>
                <th>เวลาสิ้นสุด</th>
                <th>รวมเวลาทั้งหมด (นาที)</th>
                <th>รายละเอียด</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <tr key={entry.OT_id}>
                    {editingId === entry.OT_id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            name="employee_name"
                            value={editedEntry.employee_name}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="employee_lastname"
                            value={editedEntry.employee_lastname}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            name="date"
                            value={editedEntry.date}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            name="start_time"
                            value={editedEntry.start_time}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            name="end_time"
                            value={editedEntry.end_time}
                            onChange={handleChange}
                          />
                        </td>
                        <td>{entry.alltime}</td>
                        <td>
                          <textarea
                            name="note"
                            value={editedEntry.note}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <button
                            className="saveButton"
                            onClick={() => handleSave(entry.OT_id)}
                          >
                            บันทึก
                          </button>
                          <button
                            className="cancelButton"
                            onClick={() => setEditingId(null)}
                          >
                            ยกเลิก
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{entry.employee_name}</td>
                        <td>{entry.employee_lastname}</td>
                        <td>{entry.date}</td>
                        <td>{entry.start_time}</td>
                        <td>{entry.end_time}</td>
                        <td>{entry.alltime}</td>
                        <td>{entry.note}</td>
                        <td>
                          <button
                            className="editButton"
                            onClick={() => handleEdit(entry)}
                          >
                            แก้ไข
                          </button>
                          <button
                            className="deleteButton"
                            onClick={() => handleDelete(entry.OT_id)}
                          >
                            ลบ
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
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
