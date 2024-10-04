package controller

import (
	"database/sql"
	"net/http"
	"strconv"

	"db/models" 

	"github.com/gin-gonic/gin"
)

type ReportController struct {
	DB *sql.DB
}

// func (rc *ReportController) GetReports(c *gin.Context) {
// 	monthStr := c.Param("month")
// 	yearStr := c.Param("year")

// 	month, err := strconv.Atoi(monthStr)
// 	if err != nil || month < 1 || month > 12 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid month"})
// 		return
// 	}

// 	year, err := strconv.Atoi(yearStr)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid year"})
// 		return
// 	}

// 	reports, err := models.GetReportsByMonth(rc.DB, month, year)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch reports: " + err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, reports)
// }

// ใน controller/report.go
func (rc *ReportController) GetMonthlyReport(c *gin.Context) {
	monthStr := c.Param("month")
	yearStr := c.Param("year")

	month, err := strconv.Atoi(monthStr)
	if err != nil || month < 1 || month > 12 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid month"})
		return
	}

	year, err := strconv.Atoi(yearStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid year"})
		return
	}

	reports, err := models.GetReportsByMonth(rc.DB, month, year)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch reports: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, reports)
}


func (rc *ReportController) GetReportsAll(c *gin.Context) {
	reports, err := models.GetAllReports(rc.DB)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch reports: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, reports)
}


func (rc *ReportController) GetReportsByYearAndMonth(c *gin.Context) {
	yearStr := c.Param("year")
	monthStr := c.Param("month")

	year, err := strconv.Atoi(yearStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid year"})
		return
	}

	month, err := strconv.Atoi(monthStr)
	if err != nil || month < 1 || month > 12 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid month"})
		return
	}

	reports, err := models.GetReportsByMonth(rc.DB, month, year)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch reports: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, reports)
}

func (rc *ReportController) GetReports(c *gin.Context) {
	monthStr := c.Param("month")
	yearStr := c.Param("year")

	month, err := strconv.Atoi(monthStr)
	if err != nil || month < 1 || month > 12 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid month"})
		return
	}

	year, err := strconv.Atoi(yearStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid year"})
		return
	}

	reports, err := models.GetReportsByMonth(rc.DB, month, year)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch reports: " + err.Error()})
		return
	}

	if len(reports) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "No reports found for the specified month and year"})
		return
	}

	c.JSON(http.StatusOK, reports)
}
