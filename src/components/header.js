import React from "react";
import "../css/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-navbar">
      <div className="container-fluid">
        <Link to="/home">
          <img src="/odds_logo.png" alt="Logo" />
        </Link>
        <div className="navbar-position">
          <a className="navbar-brand" href="#">
            Time Attendance
          </a>
          <div className="icon-container">
            <div className="square">
              <p>Test test</p>
              <i className="fas fa-user" id="user-icon"></i>
            </div>
            <Link to="/login">
              <i className="fas fa-sign-out-alt" id="signout"></i>{" "}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
