package controller

import (
    "database/sql"
    "net/http"
    "strconv"
    "time"

    "github.com/gin-gonic/gin"
    "db/models"
)

type OvertimeController struct {
    DB *sql.DB
}

// ฟังก์ชันสำหรับเพิ่มข้อมูล
func (oc *OvertimeController) AddOvertime(c *gin.Context) {
    var overtime models.Overtime
    if err := c.ShouldBindJSON(&overtime); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    // คำนวณเวลาทั้งหมด
    startTime, err := time.Parse("15:04", overtime.StartTime)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid start time"})
        return
    }

    endTime, err := time.Parse("15:04", overtime.EndTime)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid end time"})
        return
    }

    // ตรวจสอบว่า endTime ต้องมากกว่า startTime
    if endTime.Before(startTime) {
        c.JSON(http.StatusBadRequest, gin.H{"error": "End time must be after start time"})
        return
    }

    // คำนวณเวลาทั้งหมด (ชั่วโมง)
    overtime.AllTime = endTime.Sub(startTime).Hours()

    // บันทึกข้อมูลลงในฐานข้อมูล
    if err := models.AddOvertime(oc.DB, overtime); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not add overtime: " + err.Error()})
        return
    }

    c.JSON(http.StatusCreated, overtime)
}

// ฟังก์ชันสำหรับแสดงข้อมูลโดย ID
func (oc *OvertimeController) GetOvertimeByID(c *gin.Context) {
    idStr := c.Param("id")
    id, err := strconv.Atoi(idStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    overtime, err := models.GetOvertimeByID(oc.DB, id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch overtime: " + err.Error()})
        return
    }

    if overtime == nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Overtime not found"})
        return
    }

    c.JSON(http.StatusOK, overtime)
}

// ฟังก์ชันสำหรับอัพเดตข้อมูล
func (oc *OvertimeController) UpdateOvertime(c *gin.Context) {
    idStr := c.Param("id")
    id, err := strconv.Atoi(idStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    var overtime models.Overtime
    if err := c.ShouldBindJSON(&overtime); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    // คำนวณเวลาทั้งหมดใหม่
    startTime, err := time.Parse("15:04", overtime.StartTime)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid start time"})
        return
    }

    endTime, err := time.Parse("15:04", overtime.EndTime)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid end time"})
        return
    }

    // ตรวจสอบว่า endTime ต้องมากกว่า startTime
    if endTime.Before(startTime) {
        c.JSON(http.StatusBadRequest, gin.H{"error": "End time must be after start time"})
        return
    }

    overtime.OvertimeID = id
    overtime.AllTime = endTime.Sub(startTime).Hours() // คำนวณเวลาทั้งหมดใหม่

    if err := models.UpdateOvertime(oc.DB, overtime); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update overtime: " + err.Error()})
        return
    }

    c.JSON(http.StatusOK, overtime)
}

// ฟังก์ชันสำหรับลบข้อมูล
func (oc *OvertimeController) DeleteOvertime(c *gin.Context) {
    idStr := c.Param("id")
    id, err := strconv.Atoi(idStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    if err := models.DeleteOvertime(oc.DB, id); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not delete overtime: " + err.Error()})
        return
    }

    c.JSON(http.StatusNoContent, nil)
}

// ฟังก์ชันสำหรับแสดงข้อมูลทั้งหมด
func (oc *OvertimeController) GetAllOvertime(c *gin.Context) {
    overtimes, err := models.GetAllOvertime(oc.DB)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch overtimes: " + err.Error()})
        return
    }

    c.JSON(http.StatusOK, overtimes)
}
