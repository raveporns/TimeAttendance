import React, { useState } from "react";
import "../css/header.css";
import "../css/button.css";
import "../css/leave.css";
import Header from "../components/header";
import { Link } from "react-router-dom";

const Leave = () => {

  const [leaveDetails, setLeaveDetails] = useState({
    reason: "",
    startDate: "",
    endDate: "",
  });

  // State for success message
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Display the success message after form submission
    console.log(leaveDetails); // Log the details, could be sent to backend here
  };

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
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="reason">Reason for Leave:</label>
              <input
                type="text"
                id="reason"
                name="reason"
                value={leaveDetails.reason}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={leaveDetails.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={leaveDetails.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <h1></h1>


      {submitted && <p>Your leave request has been submitted!</p>}
    </div>
  );
};

export default Leave;