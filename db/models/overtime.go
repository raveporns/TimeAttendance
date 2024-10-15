package models

import (
	"database/sql"
)

type Overtime struct {
	OvertimeID       int     `json:"OT_id"`
	EmployeeID       int     `json:"employee_id"`
	EmployeeName     string  `json:"employee_name"`
	EmployeeLastName string  `json:"employee_lastname"`
	Date             string  `json:"date"`
	StartTime        string  `json:"start_time"`
	EndTime          string  `json:"end_time"`
	AllTime          float64 `json:"alltime"`
	Note             string  `json:"note"`
}

// ฟังก์ชันดึงข้อมูล overtime โดย ID
func GetOvertimeByID(db *sql.DB, id int) (*Overtime, error) {
	query := `SELECT ot_id, employee_id, date, start_time, end_time, alltime, note FROM overtime WHERE ot_id = ?`
	var ot Overtime
	err := db.QueryRow(query, id).Scan(&ot.OvertimeID, &ot.EmployeeID, &ot.Date, &ot.StartTime, &ot.EndTime, &ot.AllTime, &ot.Note)
	if err == sql.ErrNoRows {
		return nil, nil // ไม่มีข้อมูล
	}
	return &ot, err
}

// ฟังก์ชันเพิ่ม overtime
func AddOvertime(db *sql.DB, overtime Overtime) error {
	query := `INSERT INTO overtime (employee_id, date, start_time, end_time, alltime, note) VALUES (?, ?, ?, ?, ?, ?)`
	_, err := db.Exec(query, overtime.EmployeeID, overtime.Date, overtime.StartTime, overtime.EndTime, overtime.AllTime, overtime.Note)
	return err
}

// ฟังก์ชันอัพเดต overtime
func UpdateOvertime(db *sql.DB, overtime Overtime) error {
    query := `UPDATE overtime SET employee_id = ?, date = ?, start_time = ?, end_time = ?, alltime = ?, note = ? WHERE ot_id = ?`
    _, err := db.Exec(query, overtime.EmployeeID, overtime.Date, overtime.StartTime, overtime.EndTime, overtime.AllTime, overtime.Note, overtime.OvertimeID)
    return err
}

// ฟังก์ชันลบ overtime
func DeleteOvertime(db *sql.DB, id int) error {
	query := `DELETE FROM overtime WHERE ot_id = ?`
	_, err := db.Exec(query, id)
	return err
}

// ฟังก์ชันดึงข้อมูล overtime ทั้งหมด
func GetAllOvertime(db *sql.DB) ([]Overtime, error) {
	query := `
		SELECT 
			o.ot_id, 
			o.employee_id, 
			e.employee_name, 
			e.employee_lastname, 
			o.date, 
			o.start_time, 
			o.end_time, 
			o.alltime, 
			o.note 
		FROM 
			overtime o
		JOIN 
			employee e ON o.employee_id = e.employee_id`
	
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var overtimes []Overtime
	for rows.Next() {
		var ot Overtime
		if err := rows.Scan(&ot.OvertimeID, &ot.EmployeeID, &ot.EmployeeName, &ot.EmployeeLastName, &ot.Date, &ot.StartTime, &ot.EndTime, &ot.AllTime, &ot.Note); err != nil {
			return nil, err
		}
		overtimes = append(overtimes, ot)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return overtimes, nil
}

