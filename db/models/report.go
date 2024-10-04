package models

import (
	"database/sql"
)

type Report struct {
	EmployeeID       int    `json:"employee_id"`
	EmployeeName     string `json:"employee_name"`
	EmployeeLastName string `json:"employee_lastname"`
	WorkingDay       string `json:"working_day"`
	WorkingLate      float64   `json:"working_late"`
	WorkingLeave     float64   `json:"working_leave"`
	WorkingOT        float64   `json:"working_ot"`
}

func GetReportsByMonth(db *sql.DB, month int, year int) ([]Report, error) {
	query := `
		SELECT 
			e.employee_id, 
			e.employee_name, 
			e.employee_lastname, 
			r.working_day, 
			r.working_late, 
			r.working_leave, 
			r.working_ot
		FROM 
			employee e
		JOIN 
			report r ON e.employee_id = r.employee_id
		WHERE 
			MONTH(r.working_day) = ? AND YEAR(r.working_day) = ?`

	rows, err := db.Query(query, month, year)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reports []Report
	for rows.Next() {
		var report Report
		if err := rows.Scan(&report.EmployeeID, &report.EmployeeName, &report.EmployeeLastName, &report.WorkingDay, &report.WorkingLate, &report.WorkingLeave, &report.WorkingOT); err != nil {
			return nil, err
		}
		reports = append(reports, report)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return reports, nil
}

// GetAllReports - ดึงข้อมูลทั้งหมดจากตาราง report และ employee
func GetAllReports(db *sql.DB) ([]Report, error) {
	query := `
		SELECT 
			e.employee_id, 
			e.employee_name, 
			e.employee_lastname, 
			r.working_day, 
			r.working_late, 
			r.working_leave, 
			r.working_ot
		FROM 
			employee e
		LEFT JOIN 
			report r ON e.employee_id = r.employee_id`

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reports []Report
	for rows.Next() {
		var report Report
		if err := rows.Scan(&report.EmployeeID, &report.EmployeeName, &report.EmployeeLastName, &report.WorkingDay, &report.WorkingLate, &report.WorkingLeave, &report.WorkingOT); err != nil {
			return nil, err
		}
		reports = append(reports, report)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return reports, nil
}

