
package controller

import (
    "database/sql"
    "net/http"

    "github.com/gin-gonic/gin"
    "db/models"
)

type EmployeeController struct {
    DB *sql.DB
}

// GetAllEmployees ดึงข้อมูลพนักงานทั้งหมดจากฐานข้อมูล
func (ec *EmployeeController) GetAllEmployees(c *gin.Context) {
    employees, err := ec.fetchAllEmployees()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, employees)
}

// fetchAllEmployees ฟังก์ชันเพื่อดึงข้อมูลพนักงานจากฐานข้อมูล
func (ec *EmployeeController) fetchAllEmployees() ([]models.Employee, error) {
    rows, err := ec.DB.Query("SELECT employee_id, employee_name, employee_lastname, employee_birthday, employee_phone FROM employee")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var employees []models.Employee
    for rows.Next() {
        var employee models.Employee
        if err := rows.Scan(&employee.EmployeeID, &employee.EmployeeName, &employee.EmployeeLastName, &employee.EmployeeBirthDay, &employee.EmployeePhone); err != nil {
            return nil, err
        }
        employees = append(employees, employee)
    }

    return employees, nil
}

