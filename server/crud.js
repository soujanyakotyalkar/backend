const db = require("./database");

// CREATE Students
const createStudent = (studentName, USN, callback) => {
  const sql = `INSERT INTO students (studentName, USN) VALUES (?, ?)`;
  db.run(sql, [studentName, USN], function (err) {
    if (err) {
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

// UPDATE Student
const updateStudent = (id, studentName, USN, currentSem, callback) => {
  const sql = `UPDATE students SET studentName = ?, USN = ?, currentSem = ? WHERE id = ?`;
  db.run(sql, [studentName, USN, Total, currentSem, id], function (err) {
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
  getSubjectsBySemesterId,
  updateSubject,
  deleteSubject,
};
