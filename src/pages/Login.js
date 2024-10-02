import React from "react";
import "../css/login.css";

const Login = () => {
  return (
    <div className="all-form">
      <form className="form-square">
        <img src="/odds_logo.png" alt="Logo" />
        <div className="form-center">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              บัญชีผู้ใช้
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              รหัสผ่าน
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
        </div>
        <span> * ลืมรหัสผ่านติดต่อที่ admin@odds.com *</span>
        <button type="submit" className="btn ">
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
};

export default Login;
