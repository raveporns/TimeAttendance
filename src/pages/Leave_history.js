import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import "../css/buttonLeave.css";
import Header from "../components/header";
const Leave_history = () => {
    return (
        <div>
            <Header />

            <div className="summary-container">
                <div className="col-3 bg-light p-3 border">
                    <div className="btn-allLeave">
                        <div className="d-grid">
                            <Link to="/leave" className="btn-leave">
                                การลา
                            </Link>
                            <Link to="/leave/history" className="btn-leave">
                                การลาทั้งหมด
                            </Link>
                            <Link to="/home" className="btn-leave">
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
                                    <th scope="col">ประเภทการลา</th>
                                    <th scope="col">วันเริ่ม</th>
                                    <th scope="col">วันสิ้นสุด</th>
                                    <th scope="col">จํานวนวัน</th>
                                    <th scope="col">หมายเหตุ</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leave_history;
