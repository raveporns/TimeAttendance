package controller

import (
    "database/sql"
    "net/http"
    "strconv"
    "time"

    "github.com/gin-gonic/gin"
    "db/models"
)

type AttendanceController struct {
    DB *sql.DB
}

// ฟังก์ชันสำหรับเพิ่มข้อมูล Attendance
func (ac *AttendanceController) AddAttendance(c *gin.Context) {
    var attendance models.Attendance
    if err := c.ShouldBindJSON(&attendance); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    // ตรวจสอบว่าควรใช้เวลาปัจจุบันสำหรับเวลาเข้างาน
    attendance.Time = time.Now()

    if err := models.AddAttendance(ac.DB, attendance); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not add attendance: " + err.Error()})
        return
    }

    c.JSON(http.StatusCreated, attendance)
}

// ฟังก์ชันสำหรับแสดงข้อมูล Attendance โดย ID
func (ac *AttendanceController) GetAttendanceByID(c *gin.Context) {
    idStr := c.Param("id")
    id, err := strconv.Atoi(idStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    attendance, err := models.GetAttendanceByID(ac.DB, id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch attendance: " + err.Error()})
        return
    }

    if attendance == nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Attendance not found"})
        return
    }

    c.JSON(http.StatusOK, attendance)
}

// ฟังก์ชันสำหรับแสดงข้อมูลทั้งหมด
func (ac *AttendanceController) GetAllAttendance(c *gin.Context) {
    attendances, err := models.GetAllAttendance(ac.DB)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch attendance: " + err.Error()})
        return
    }

    c.JSON(http.StatusOK, attendances)
}