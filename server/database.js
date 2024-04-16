const sqlite3 = require("sqlite3").verbose();

const dbName = "database.db";

// Connect to SQLite database
let db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the database");

    // Create students table
    db.run(
      `CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        studentName TEXT,
        USN TEXT,
        branch TEXT,
        image TEXT
        )`,
      (err) => {
        if (err) {
          console.error("Error creating students table:", err.message);
        } else {
          console.log("Students table created successfully");
        }
      }
    );

    // Create semesters table
    db.run(
      `CREATE TABLE IF NOT EXISTS semesters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            studentId INTEGER,
            sem INTEGER,
            FOREIGN KEY (studentId) REFERENCES students(id)
        )`,
      (err) => {
        if (err) {
          console.error("Error creating semesters table:", err.message);
        } else {
          console.log("Semesters table created successfully");
        }
      }
    );

    // Create subjects table
    db.run(
      `CREATE TABLE IF NOT EXISTS subjects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            semesterId INTEGER,
            subjectName TEXT,
            subjectCode TEXT,
            IAMarks INTEGER,
            EAMarks INTEGER,
            total INTEGER,
            result INTEGER,
            FOREIGN KEY (semesterId) REFERENCES semesters(id)
        )`,
      (err) => {
        if (err) {
          console.error("Error creating subjects table:", err.message);
        } else {
          console.log("Subjects table created successfully");
        }
      }
    );
  }
});

module.exports = db;
// Close the database connection
// db.close(); // Uncomment this line if you want to close the database connection after creating tables
