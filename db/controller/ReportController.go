package controller

import (
	"database/sql"
	"net/http"

	"db/models"

	"github.com/gin-gonic/gin"
)

type ReportController struct {
	DB *sql.DB
}

func (rc *ReportController) GetReportsAll(c *gin.Context) {
	reports, err := models.GetAllReports(rc.DB)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch reports: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, reports)
}
