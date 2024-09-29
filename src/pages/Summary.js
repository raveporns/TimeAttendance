import React from "react";
import Header from "../components/header";
import "../css/summary.css";
import { NavLink } from "react-router-dom";

const Summary = () => {
  return (
    <div>
      <Header />

      <div className="summary-container">
        <div className="col-3 bg-light p-3 border">
          <nav className="nav flex-column">
            <a className="nav-link" href="#">
              มาสายทั้งหมด
            </a>
            <a className="nav-link" href="#">
              ลาทั้งหมด
            </a>
            <a className="nav-link" href="#">
              มาสายวันนี้
            </a>
            <a className="nav-link" href="#">
              ลาวันนี้
            </a>
          </nav>
        </div>
        <div className="col-sm-9 bg-light p-3 border">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Summary;
