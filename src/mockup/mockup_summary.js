// src/mockup_summary.js

const monthData = {
  "2023": {
    มกราคม: [
      { empId: "E001", first: "Mark", last: "Otto", date: 22, late: 2, leave: 1, overtime: 5 },
      { empId: "E002", first: "Jacob", last: "Thornton", date: 20, late: 3, leave: 2, overtime: 2 },
      { empId: "E003", first: "Emily", last: "Smith", date: 21, late: 0, leave: 1, overtime: 4 },
      { empId: "E004", first: "Michael", last: "Johnson", date: 19, late: 2, leave: 0, overtime: 3 },
      { empId: "E005", first: "Jessica", last: "Williams", date: 22, late: 1, leave: 2, overtime: 1 },
      { empId: "E006", first: "David", last: "Brown", date: 20, late: 0, leave: 0, overtime: 2 },
      { empId: "E007", first: "Sarah", last: "Jones", date: 21, late: 3, leave: 1, overtime: 5 },
      { empId: "E008", first: "Chris", last: "Garcia", date: 19, late: 2, leave: 1, overtime: 0 },
      { empId: "E009", first: "Laura", last: "Martinez", date: 22, late: 1, leave: 0, overtime: 2 },
      { empId: "E010", first: "Daniel", last: "Hernandez", date: 20, late: 0, leave: 2, overtime: 3 },
      { empId: "E011", first: "Sophia", last: "Lopez", date: 21, late: 2, leave: 1, overtime: 4 },
      { empId: "E012", first: "Matthew", last: "Gonzalez", date: 19, late: 3, leave: 0, overtime: 1 },
      { empId: "E013", first: "Ava", last: "Wilson", date: 22, late: 0, leave: 2, overtime: 2 },
      { empId: "E014", first: "James", last: "Anderson", date: 20, late: 1, leave: 1, overtime: 3 },
      { empId: "E015", first: "Mia", last: "Thomas", date: 21, late: 2, leave: 0, overtime: 5 },
    ],
    กุมภาพันธ์: [
      { empId: "E001", first: "Mark", last: "Otto", date: 19, late: 1, leave: 0, overtime: 3 },
      { empId: "E002", first: "Jacob", last: "Thornton", date: 18, late: 2, leave: 1, overtime: 1 },
      { empId: "E003", first: "Emily", last: "Smith", date: 20, late: 0, leave: 2, overtime: 4 },
      { empId: "E004", first: "Michael", last: "Johnson", date: 21, late: 1, leave: 0, overtime: 5 },
      { empId: "E005", first: "Jessica", last: "Williams", date: 19, late: 2, leave: 1, overtime: 2 },
      { empId: "E006", first: "David", last: "Brown", date: 20, late: 0, leave: 0, overtime: 3 },
      { empId: "E007", first: "Sarah", last: "Jones", date: 21, late: 3, leave: 1, overtime: 4 },
      { empId: "E008", first: "Chris", last: "Garcia", date: 18, late: 2, leave: 0, overtime: 1 },
      { empId: "E009", first: "Laura", last: "Martinez", date: 19, late: 1, leave: 2, overtime: 2 },
      { empId: "E010", first: "Daniel", last: "Hernandez", date: 20, late: 0, leave: 1, overtime: 3 },
      { empId: "E011", first: "Sophia", last: "Lopez", date: 21, late: 2, leave: 1, overtime: 4 },
      { empId: "E012", first: "Matthew", last: "Gonzalez", date: 19, late: 3, leave: 0, overtime: 2 },
      { empId: "E013", first: "Ava", last: "Wilson", date: 20, late: 0, leave: 1, overtime: 3 },
      { empId: "E014", first: "James", last: "Anderson", date: 21, late: 1, leave: 2, overtime: 1 },
      { empId: "E015", first: "Mia", last: "Thomas", date: 19, late: 2, leave: 0, overtime: 4 },
    ],
    // เพิ่มเดือนอื่น ๆ
  },
  "2024": {
    มกราคม: [
      { empId: "E001", first: "Mark", last: "Otto", date: 21, late: 1, leave: 0, overtime: 4 },
      { empId: "E002", first: "Jacob", last: "Thornton", date: 22, late: 2, leave: 1, overtime: 1 },
      { empId: "E003", first: "Emily", last: "Smith", date: 20, late: 0, leave: 0, overtime: 3 },
      { empId: "E004", first: "Michael", last: "Johnson", date: 19, late: 3, leave: 2, overtime: 5 },
      { empId: "E005", first: "Jessica", last: "Williams", date: 22, late: 1, leave: 1, overtime: 2 },
      { empId: "E006", first: "David", last: "Brown", date: 20, late: 0, leave: 0, overtime: 3 },
      { empId: "E007", first: "Sarah", last: "Jones", date: 21, late: 1, leave: 1, overtime: 4 },
      { empId: "E008", first: "Chris", last: "Garcia", date: 22, late: 0, leave: 1, overtime: 2 },
      { empId: "E009", first: "Laura", last: "Martinez", date: 20, late: 1, leave: 0, overtime: 3 },
      { empId: "E010", first: "Daniel", last: "Hernandez", date: 19, late: 0, leave: 2, overtime: 4 },
      { empId: "E011", first: "Sophia", last: "Lopez", date: 22, late: 1, leave: 1, overtime: 1 },
      { empId: "E012", first: "Matthew", last: "Gonzalez", date: 20, late: 2, leave: 0, overtime: 3 },
      { empId: "E013", first: "Ava", last: "Wilson", date: 21, late: 3, leave: 1, overtime: 5 },
      { empId: "E014", first: "James", last: "Anderson", date: 19, late: 0, leave: 1, overtime: 2 },
      { empId: "E015", first: "Mia", last: "Thomas", date: 22, late: 2, leave: 0, overtime: 3 },
      { empId: "E001", first: "Mark", last: "Otto", date: 21, late: 1, leave: 0, overtime: 4 },
      { empId: "E002", first: "Jacob", last: "Thornton", date: 22, late: 2, leave: 1, overtime: 1 },
      { empId: "E003", first: "Emily", last: "Smith", date: 20, late: 0, leave: 0, overtime: 3 },
      { empId: "E004", first: "Michael", last: "Johnson", date: 19, late: 3, leave: 2, overtime: 5 },
      { empId: "E005", first: "Jessica", last: "Williams", date: 22, late: 1, leave: 1, overtime: 2 },
      { empId: "E006", first: "David", last: "Brown", date: 20, late: 0, leave: 0, overtime: 3 },
      { empId: "E007", first: "Sarah", last: "Jones", date: 21, late: 1, leave: 1, overtime: 4 },
      { empId: "E008", first: "Chris", last: "Garcia", date: 22, late: 0, leave: 1, overtime: 2 },
      { empId: "E009", first: "Laura", last: "Martinez", date: 20, late: 1, leave: 0, overtime: 3 },
      { empId: "E010", first: "Daniel", last: "Hernandez", date: 19, late: 0, leave: 2, overtime: 4 },
      { empId: "E011", first: "Sophia", last: "Lopez", date: 22, late: 1, leave: 1, overtime: 1 },
      { empId: "E012", first: "Matthew", last: "Gonzalez", date: 20, late: 2, leave: 0, overtime: 3 },
      { empId: "E013", first: "Ava", last: "Wilson", date: 21, late: 3, leave: 1, overtime: 5 },
      { empId: "E014", first: "James", last: "Anderson", date: 19, late: 0, leave: 1, overtime: 2 },
      { empId: "E015", first: "Mia", last: "Thomas", date: 22, late: 2, leave: 0, overtime: 3 },
    ],
    // เพิ่มเดือนอื่น ๆ
  },
};

export default monthData;
