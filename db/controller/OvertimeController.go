package controller

import (
	"database/sql"
	"net/http"
	"strconv"

	"db/models"

	"github.com/gin-gonic/gin"
)

type OvertimeController struct {
	DB *sql.DB
}

// ฟังก์ชันสำหรับเพิ่มข้อมูลการทำงานล่วงเวลา
func (oc *OvertimeController) AddOvertime(c *gin.Context) {
	var overtime models.Overtime
	if err := c.ShouldBindJSON(&overtime); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// ตรวจสอบความถูกต้องของเวลา
	if overtime.StartTime >= overtime.EndTime {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Start time must be before end time"})
		return
	}

	if err := models.AddOvertime(oc.DB, overtime); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not add overtime: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, overtime)
}

// ฟังก์ชันสำหรับแสดงข้อมูลการทำงานล่วงเวลาโดย ID
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

// ฟังก์ชันสำหรับแก้ไขข้อมูลการทำงานล่วงเวลา
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

	overtime.OvertimeID = id // กำหนด ID ของ overtime

	// ตรวจสอบความถูกต้องของเวลา
	if overtime.StartTime >= overtime.EndTime {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Start time must be before end time"})
		return
	}

	if err := models.UpdateOvertime(oc.DB, overtime); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update overtime: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, overtime)
}

// ฟังก์ชันสำหรับลบข้อมูลการทำงานล่วงเวลา
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

// ฟังก์ชันสำหรับแสดงข้อมูลการทำงานล่วงเวลาทั้งหมด
func (oc *OvertimeController) GetAllOvertime(c *gin.Context) {
	overtimes, err := models.GetAllOvertime(oc.DB)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch overtimes: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, overtimes)
}
