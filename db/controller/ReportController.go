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

	c.JSON(http.StatusOK, reports)
}
