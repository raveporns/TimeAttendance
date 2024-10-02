package models

import (
	"database/sql"
	"time"
)

type Report struct {
	EmployeeID      int       `json:"employee_id"`
	EmployeeName    string    `json:"employee_name"`
	EmployeeLastName string    `json:"employee_lastname"`
	WorkingDate     time.Time `json:"working_date"`
	WorkingLate     bool      `json:"working_late"`
	WorkingLeave    bool      `json:"working_leave"`
	WorkingOT       bool      `json:"working_ot"`
}

// Function to fetch report by month
func GetReportsByMonth(db *sql.DB, month int, year int) ([]Report, error) {
	query := `
		SELECT employee_id, employee_name, employee_lastname, working_date, working_late, working_leave, working_ot
		FROM report
		WHERE MONTH(working_date) = ? AND YEAR(working_date) = ?`

	rows, err := db.Query(query, month, year)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reports []Report
	for rows.Next() {
		var report Report
		if err := rows.Scan(&report.EmployeeID, &report.EmployeeName, &report.EmployeeLastName, &report.WorkingDate, &report.WorkingLate, &report.WorkingLeave, &report.WorkingOT); err != nil {
			return nil, err
		}
		reports = append(reports, report)
	}

	// Check for errors during iteration
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return reports, nil
}
