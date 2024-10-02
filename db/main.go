package main

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gin-gonic/gin"
	"db/controller"
	"github.com/joho/godotenv"
)

func main() {
	// โหลด environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// ดึงค่าจาก environment variables
	dbUser := os.Getenv("MYSQL_USER")
	dbPassword := os.Getenv("MYSQL_PASSWORD")
	dbName := os.Getenv("MYSQL_DATABASE")
	dbHost := os.Getenv("MYSQL_HOST")
	dbPort := os.Getenv("MYSQL_PORT")

	// สร้าง DSN สำหรับเชื่อมต่อกับฐานข้อมูล
	dsn := dbUser + ":" + dbPassword + "@tcp(" + dbHost + ":" + dbPort + ")/" + dbName

	// เชื่อมต่อกับฐานข้อมูล
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}
	defer func() {
		if err := db.Close(); err != nil {
			log.Printf("Error closing the database: %v", err)
		}
	}()

	// ตรวจสอบการเชื่อมต่อฐานข้อมูล
	if err := db.Ping(); err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}

	// สร้าง ReportController
	reportController := &controller.ReportController{DB: db}

	// สร้าง Gin router
	router := gin.Default()

	// Middleware สำหรับจัดการ CORS
	router.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		c.Header("Access-Control-Allow-Methods", "GET")
		c.Next()
	})

	// เส้นทางสำหรับดึงรายงาน
	router.GET("/reports/:year/:month", reportController.GetReports)

	log.Println("Server starting on :8082")
	if err := router.Run(":8082"); err != nil {
		log.Fatal(err)
	}
}
