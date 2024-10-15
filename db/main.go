package main

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gin-gonic/gin"
	"db/controller"
	"github.com/joho/godotenv"
	"github.com/gin-contrib/cors"
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
	dbPort := os.Getenv("MYSQL_PORT")

	// สร้าง DSN สำหรับเชื่อมต่อกับฐานข้อมูล
	dsn := dbUser + ":" + dbPassword + "@tcp(127.0.0.1:" + dbPort + ")/" + dbName

	// เชื่อมต่อกับฐานข้อมูล
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}
	defer db.Close()

	// ตรวจสอบการเชื่อมต่อฐานข้อมูล
	if err := db.Ping(); err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}

	// สร้าง ReportController, OvertimeController และ EmployeeController
	reportController := &controller.ReportController{DB: db}
	overtimeController := &controller.OvertimeController{DB: db}
	employeeController := &controller.EmployeeController{DB: db}

	// สร้าง Gin router
	router := gin.Default()

	// Middleware สำหรับจัดการ CORS
	router.Use(cors.Default())

	// เส้นทางสำหรับดึงรายงาน
	router.GET("/reports/all", reportController.GetReportsAll)

	// เส้นทางสำหรับการจัดการ overtime
	router.POST("/overtime", overtimeController.AddOvertime)
	router.GET("/overtime/:id", overtimeController.GetOvertimeByID)
	router.PUT("/overtime/:id", overtimeController.UpdateOvertime)
	router.DELETE("/overtime/:id", overtimeController.DeleteOvertime)
	router.GET("/overtime/all", overtimeController.GetAllOvertime)

	// เส้นทางสำหรับดึงข้อมูลพนักงาน
	router.GET("/employees/all", employeeController.GetAllEmployees)

	log.Println("Server starting on :8082")
	if err := router.Run(":8082"); err != nil {
		log.Fatal(err)
	}
}
