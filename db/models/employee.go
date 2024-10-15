package models

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

// กำหนดโครงสร้าง Employee
type Employee struct {
	EmployeeID       int    `json:"employee_id"`
	EmployeeName     string `json:"employee_name"`
	EmployeeLastName string `json:"employee_lastname"`
	EmployeeBirthDay string `json:"employee_birthday"`
	EmployeePhone    string `json:"employee_phone"`
}

// FetchEmployees ดึงข้อมูลพนักงานทั้งหมดจากฐานข้อมูล
func FetchEmployees(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	employees, err := getAllEmployees(db)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(employees); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

// getAllEmployees ฟังก์ชันเพื่อดึงข้อมูลพนักงานจากฐานข้อมูล
func getAllEmployees(db *sql.DB) ([]Employee, error) {
	rows, err := db.Query("SELECT employee_id, employee_name, employee_lastname, employee_birthday, employee_phone FROM employee")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var employees []Employee
	for rows.Next() {
		var emp Employee
		if err := rows.Scan(&emp.EmployeeID, &emp.EmployeeName, &emp.EmployeeLastName, &emp.EmployeeBirthDay, &emp.EmployeePhone); err != nil {
			return nil, err
		}
		employees = append(employees, emp)
	}

	return employees, nil
}
