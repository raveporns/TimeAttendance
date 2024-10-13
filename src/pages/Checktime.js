import React, { useState, useEffect } from "react";
import Header from "../components/header";
import "../css/Checktime.css"

const Checktime = () => {
  const [checkInTime,setCheckInTime]=useState(null);
  const [checkOutTime,setCheckOutTime]=useState(null);
  const [userName, setUserName] = useState(""); // เพิ่ม state สำหรับชื่อผู้ใช้
  const [checkedIn, setCheckedIn] = useState(false); // ตรวจสอบสถานะการ check-in
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const userNames = ["กัญญาณัฐ ภูมิวัตร", 
    "รวีพร สุภาพันธุ์ชัย", 
    "วัชรมน เผือกกลาง", 
    "มาร์ค ลี", 
    "ลีโอนาร์โด ดิแคพริโอ", 
    "กร วรรณไพรโรจน์", 
    "ไทย ชญานนท์", 
    "ไอแซค นิวตัน", 
    "โอลิเวีย โลดริโก", 
    "สเตฟาน เคอรี่", 
    "เมดิสัน เบียร์", 
    "เบบี้ ชาร์ค", 
    "บรูโน่ มาร์", 
    "แมตตี้ ฮีลลี่", "คาเมโล แอนโทนี"];

    // อัปเดตเวลาปัจจุบันทุกวินาที
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString();
    setCheckInTime(now);
    setCheckedIn(true);
  };

  const handleCheckOut = () => {
    const now = new Date().toLocaleTimeString();
    setCheckOutTime(now);
    setCheckedIn(false);
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div className="checktime-container">
      <Header />
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
            disabled={checkedIn}
          >
            <option value="">-- เลือกรายชื่อ --</option>
            {userNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="action-buttons">
        <button
          className="check-in-button"
          onClick={handleCheckIn}
          disabled={!userName || checkedIn}
        >
          เข้างาน
        </button>

        <button
          className="check-out-button"
          onClick={handleCheckOut}
          disabled={!checkInTime || !checkedIn}
        >
          เลิกงาน
        </button>
      </div>
    </div>
  );
};

export default Checktime;
