import React from "react";
import "../css/header.css";

const Header = () => {
  return (
    <nav class="navbar navbar-dark bg-navbar">
      <div class="container-fluid">
        <img src="/odds_logo.png" alt="Logo" />
        <div className="navbar-position">
          <a class="navbar-brand" href="#">
            Time Attendance
          </a>
          <div className="icon-container">
            <div className="square">
              <p>Test test</p>
              <i className="fas fa-user" id="user-icon"></i>
            </div>
            
            <i className="fas fa-sign-out-alt" id="signout"></i>{" "}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
