import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // นำเข้าโมดัล
import Header from "../components/header";
import "../css/Checktime.css";

const Checktime = () => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [userName, setUserName] = useState(""); // ชื่อพนักงาน
  const [status, setStatus] = useState(""); // สถานะ
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [employeeData, setEmployeeData] = useState([]); // เก็บข้อมูลพนักงาน
  const [isModalOpen, setIsModalOpen] = useState(false); // สถานะเปิด/ปิดโมเดล
  const [modalMessage, setModalMessage] = useState(""); // ข้อความในโมเดล

  const userNames = [
    { id: "001", name: "กัญญาณัฐ ภูมิวัตร", position: "Developer" },
    { id: "002", name: "รวีพร สุภาพันธุ์ชัย", position: "Manager" },
    { id: "003", name: "วัชรมน เผือกกลาง", position: "Designer" },
    { id: "004", name: "มาร์ค ลี", position: "Engineer" },
    { id: "005", name: "ลีโอนาร์โด ดิแคพริโอ", position: "Actor" },
    { id: "006", name: "กร วรรณไพรโรจน์", position: "Technician" },
    { id: "007", name: "ไทย ชญานนท์", position: "Analyst" },
    { id: "008", name: "ไอแซค นิวตัน", position: "Scientist" },
    { id: "009", name: "โอลิเวีย โลดริโก", position: "Singer" },
    { id: "010", name: "สเตฟาน เคอรี่", position: "Athlete" },
    { id: "011", name: "เมดิสัน เบียร์", position: "Singer" },
    { id: "012", name: "เบบี้ ชาร์ค", position: "Cartoon" },
    { id: "013", name: "บรูโน่ มาร์", position: "Singer" },
    { id: "014", name: "แมตตี้ ฮีลลี่", position: "Musician" },
    { id: "015", name: "คาเมโล แอนโทนี", position: "Basketball Player" }
  ];

  // อัปเดตเวลาปัจจุบันทุกวินาที
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    const nineAM = new Date();
    nineAM.setHours(9, 0, 0); // ตั้งเวลา 9:00 น.

    // ตรวจสอบว่ามาสายหรือไม่
    const lateStatus = now > nineAM ? "มาสาย" : "มาตรงเวลา";

    // เพิ่มข้อมูลพนักงานเมื่อเช็คอิน
    const selectedEmployee = userNames.find((emp) => emp.name === userName);
    if (selectedEmployee) {
      const employeeInfo = {
        id: selectedEmployee.id,
        name: selectedEmployee.name,
        position: selectedEmployee.position,
        checkIn: formattedTime,
        checkOut: "",
        status: lateStatus,
      };

      setEmployeeData((prevData) => {
        const existingEmployeeIndex = prevData.findIndex(emp => emp.name === userName);

        if (existingEmployeeIndex >= 0) {
          // หากมีพนักงานคนนี้อยู่แล้ว ให้แก้ไขข้อมูลของเขา
          const updatedData = [...prevData];
          updatedData[existingEmployeeIndex] = { ...updatedData[existingEmployeeIndex], checkIn: formattedTime, status: lateStatus };
          return updatedData;
        } else {
          // ถ้าไม่มีก็เพิ่มเข้าไป
          return [...prevData, employeeInfo];
        }
      });
    }
    setCheckInTime(formattedTime);
    setStatus(lateStatus);

    // ตั้งค่าข้อความในโมเดลและเปิดโมเดล
    setModalMessage(`เช็คอินสำเร็จ: ${userName} เวลา ${formattedTime} (${lateStatus})`);
    setIsModalOpen(true);
  };

  const handleCheckOut = () => {
    const now = new Date().toLocaleTimeString();
    setCheckOutTime(now);

    // อัปเดตข้อมูลเมื่อเช็คเอาท์
    setEmployeeData((prevData) =>
      prevData.map((emp) =>
        emp.name === userName ? { ...emp, checkOut: now } : emp
      )
    );

    // ตั้งค่าข้อความในโมเดลและเปิดโมเดล
    setModalMessage(`เช็คเอาท์สำเร็จ: ${userName} เวลา ${now}`);
    setIsModalOpen(true);
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="checktime-container">
        <div className="work-time-section">
          <h1>ลงเวลาทำงานพนักงาน</h1>
          <div className="clock-display">
            <h2>{currentTime}</h2>
          </div>
          <div className="user-select">
            <label>
              เลือกรายชื่อ
              <select
                value={userName}
                onChange={handleNameChange}
              >
                <option value="">-- เลือกรายชื่อ --</option>
                {userNames.map((user, index) => (
                  <option key={index} value={user.name}>
                    {user.name} ({user.position})
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="action-buttons">
            <button
              className="check-in-button"
              onClick={handleCheckIn}
              disabled={!userName}
            >
              เข้างาน
            </button>
            <button
              className="check-out-button"
              onClick={handleCheckOut}
              disabled={!checkInTime}
            >
              เลิกงาน
            </button>
          </div>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            <h2>ข้อความยืนยัน</h2>
            <p>{modalMessage}</p>
            <button onClick={closeModal}>ปิด</button>
          </Modal>
        </div>

        {/* แสดงข้อมูลพนักงาน */}
        <div className="employee-data">
          <h2>ข้อมูลพนักงาน</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>รหัสพนักงาน</th>
                  <th>ชื่อ</th>
                  <th>ตำแหน่ง</th>
                  <th>เวลาเข้า</th>
                  <th>เวลาออก</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.position}</td>
                    <td>{employee.checkIn}</td>
                    <td>{employee.checkOut}</td>
                    <td>{employee.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checktime;
