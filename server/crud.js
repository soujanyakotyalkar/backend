const db = require("./database");

// CREATE Student
const createStudent = (studentName, USN, branch, imagePath, callback) => {
  const sql = `INSERT INTO students (studentName, USN, branch, image) VALUES (?, ?, ?, ?)`;
  db.run(sql, [studentName, USN, branch, imagePath], function (err) {
    if (err) {
      console.log(err);
      return callback(err);
    }
    console.log(`Student ${this.lastID} added successfully`);
    callback(null, this.lastID);
  });
};

// READ Students
const getAllStudents = (callback) => {
  const sql = `SELECT * FROM students`;
  db.all(sql, (err, rows) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, rows);
  });
};

// READ Student by USN
const getStudentByUSN = (USN, callback) => {
  const sql = `SELECT * FROM students WHERE USN=?`;
  db.all(sql, [USN], (err, rows) => {
    // Use db.all() to retrieve multiple rows
    if (err) {
      return callback(err, null);
    }
    callback(null, rows); // Pass the retrieved rows back to the callback
  });
};

// READ Student by ID
const getStudentByID = (id, callback) => {
  const sql = `SELECT * FROM students WHERE id=?`;
  db.get(sql, [id], (err, row) => {
    // Use db.get() to retrieve a single row
    if (err) {
      return callback(err, null);
    }
    if (!row) {
      return callback(null, null); // Student with the given ID not found
    }
    callback(null, row); // Pass the retrieved row back to the callback
  });
};

// UPDATE Student
const updateStudent = (id, studentName, USN, branch, imagePath, callback) => {
  // Adjusted SQL query to update student record including branch and imagePath
  const sql = `UPDATE students SET studentName = ?, USN = ?, branch = ?, image = ? WHERE id = ?`;
  db.run(sql, [studentName, USN, branch, imagePath, id], function (err) {
    if (err) {
      return callback(err);
    }
    console.log(`Student with ID ${id} updated successfully`);
    callback(null);
  });
};

// DELETE Student
const deleteStudent = (id, callback) => {
  const sql = `DELETE FROM students WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return callback(err);
    }
    console.log(`Student with ID ${id} deleted successfully`);
    callback(null);
  });
};

// CREATE Semester
const createSemester = (studentId, sem, callback) => {
  const sql = `INSERT INTO semesters (studentId, sem) VALUES (?, ?)`;
  db.run(sql, [studentId, sem], function (err) {
    if (err) {
      return callback(err);
    }
    console.log(`Semester ${this.lastID} added successfully`);
    callback(null, this.lastID);
  });
};

// READ Semesters by Student ID
const getSemestersByStudentId = (studentId, callback) => {
  const sql = `SELECT * FROM semesters WHERE studentId = ?`;
  db.all(sql, [studentId], (err, rows) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, rows);
  });
};

// CREATE Subject
const createSubject = (
  semesterId,
  subjectName,
  subjectCode,
  IAMarks,
  EAMarks,
  total,
  result,
  callback
) => {
  const sql = `INSERT INTO subjects (semesterId, subjectName, subjectCode, IAMarks, EAMarks, total, result) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(
    sql,
    [semesterId, subjectName, subjectCode, IAMarks, EAMarks, total, result],
    function (err) {
      if (err) {
        return callback(err);
      }
      console.log(`Subject ${this.lastID} added successfully`);
      callback(null, this.lastID);
    }
  );
};

// READ Subject by ID
const getSubjectById = (id, callback) => {
  const sql = `SELECT * FROM subjects WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, row);
  });
};

// READ Subjects by Semester ID
const getSubjectsBySemesterId = (semesterId, callback) => {
  const sql = `SELECT * FROM subjects WHERE semesterId = ?`;
  db.all(sql, [semesterId], (err, rows) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, rows);
  });
};

// UPDATE Subject
const updateSubject = (
  id,
  subjectName,
  subjectCode,
  IAMarks,
  EAMarks,
  total,
  result,
  callback
) => {
  const sql = `UPDATE subjects SET subjectName = ?, subjectCode = ?, IAMarks = ?, EAMarks = ?, total = ?, result = ? WHERE id = ?`;
  db.run(
    sql,
    [subjectName, subjectCode, IAMarks, EAMarks, total, result, id],
    function (err) {
      if (err) {
        return callback(err);
      }
      console.log(`Subject with ID ${id} updated successfully`);
      callback(null);
    }
  );
};

// DELETE Subject
const deleteSubject = (id, callback) => {
  const sql = `DELETE FROM subjects WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return callback(err);
    }
    console.log(`Subject with ID ${id} deleted successfully`);
    callback(null);
  });
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentByUSN,
  updateStudent,
  deleteStudent,
  createSemester,
  getSemestersByStudentId,
  createSubject,
  getSubjectById,
  getSubjectsBySemesterId,
  updateSubject,
  deleteSubject,
  getStudentByID,
};
