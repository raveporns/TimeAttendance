import React from "react";
import "../css/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-navbar">
      <div className="container-fluid">
        <div className="square-logo">
          <Link to="/home">
            <img src="/odds_logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="square-position">
          <div className="square-title">
            <Link to="/" className="navbar-brand" aria-label="Time Attendance">
              Time Attendance
            </Link>
          </div>
          <div className="square-icon">
            <div className="navbar-position">
              <div className="icon-container">
                <div className="square">
                  <p>Test test</p>
                  <i className="fas fa-user" id="user-icon"></i>
                </div>
                <Link to="/login" aria-label="Logout">
                  <i className="fas fa-sign-out-alt" id="signout"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
