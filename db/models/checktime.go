package models

import (
    "database/sql"
    "time"
)

// Attendance struct
type Attendance struct {
    AttendanceID     int       `json:"attendance_id"`
    EmployeeID       int       `json:"employee_id"`
    EmployeeName     string    `json:"employee_name"`
    EmployeeLastname  string    `json:"employee_lastname"`
    Time             time.Time `json:"time"`
}

// ฟังก์ชันสำหรับเพิ่มข้อมูล Attendance
func AddAttendance(db *sql.DB, attendance Attendance) error {
    query := "INSERT INTO attendance (employee_id, employee_name, employee_lastname, time) VALUES (?, ?, ?, ?)"
    _, err := db.Exec(query, attendance.EmployeeID, attendance.EmployeeName, attendance.EmployeeLastname, attendance.Time)
    return err
}

// ฟังก์ชันสำหรับดึงข้อมูล Attendance โดย ID
func GetAttendanceByID(db *sql.DB, id int) (*Attendance, error) {
    var attendance Attendance
    query := "SELECT * FROM attendance WHERE attendance_id = ?"
    row := db.QueryRow(query, id)
    err := row.Scan(&attendance.AttendanceID, &attendance.EmployeeID, &attendance.EmployeeName, &attendance.EmployeeLastname, &attendance.Time)
    if err != nil {
        return nil, err
    }
    return &attendance, nil
}

// ฟังก์ชันสำหรับแสดงข้อมูลทั้งหมด
func GetAllAttendance(db *sql.DB) ([]Attendance, error) {
    var attendances []Attendance
    query := "SELECT * FROM attendance"
    rows, err := db.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    for rows.Next() {
        var attendance Attendance
        if err := rows.Scan(&attendance.AttendanceID, &attendance.EmployeeID, &attendance.EmployeeName, &attendance.EmployeeLastname, &attendance.Time); err != nil {
            return nil, err
        }
        attendances = append(attendances, attendance)
    }

    return attendances, nil
}
