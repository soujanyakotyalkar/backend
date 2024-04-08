const express = require("express");
const cors = require("cors");
const {
  createStudent,
  getStudentByUSN,
  getAllStudents,
  updateStudent,
  deleteStudent,
  createSemester,
  getSemestersByStudentId,
  createSubject,
  getSubjectsBySemesterId,
  updateSubject,
  deleteSubject,
} = require("./crud");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API to create a new student
app.post("/api/student", (req, res) => {
  const { studentName, USN } = req.body;
  createStudent(studentName, USN, (err, studentId) => {
    if (err) {
      return res.status(500).json({ error: "Failed to create student" });
    }
    res
      .status(201)
      .json({ message: "Student created successfully", studentId });
  });
});

// API to all students
app.get("/api/students", (req, res) => {
  getAllStudents((err, students) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch student" });
    }
    if (!students) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ students });
  });
});

// API to get student by USN
app.get("/api/student/:usn", (req, res) => {
  const { usn } = req.params;
  getStudentByUSN(usn, (err, student) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch student" });
    }
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ student });
  });
});

// API to update student by ID
app.put("/api/student/:id", (req, res) => {
  const { id } = req.params;
  const { studentName, USN, currentSem } = req.body;
  updateStudent(id, studentName, USN, currentSem, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update student" });
    }
    res
      .status(200)
      .json({ message: `Student with ID ${id} updated successfully` });
  });
});

// API to delete student by ID
app.delete("/api/student/:id", (req, res) => {
  const { id } = req.params;
  deleteStudent(id, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete student" });
    }
    res
      .status(200)
      .json({ message: `Student with ID ${id} deleted successfully` });
  });
});

// API to create a new semester for a student
app.post("/api/semester", (req, res) => {
  const { studentId, sem } = req.body;
  createSemester(studentId, sem, (err, semesterId) => {
    if (err) {
      return res.status(500).json({ error: "Failed to create semester" });
    }
    res
      .status(201)
      .json({ message: "Semester created successfully", semesterId });
  });
});

// API to get semesters by student ID
app.get("/api/semester/:studentId", (req, res) => {
  const { studentId } = req.params;
  getSemestersByStudentId(studentId, (err, semesters) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch semesters" });
    }
    res.status(200).json({ semesters });
  });
});

// API to create a new subject for a semester
app.post("/api/subject", (req, res) => {
  const {
    semesterId,
    subjectName,
    subjectCode,
    IAMarks,
    EAMarks,
    total,
    result,
  } = req.body;
  createSubject(
    semesterId,
    subjectName,
    subjectCode,
    IAMarks,
    EAMarks,
    total,
    result,
    (err, subjectId) => {
      if (err) {
        return res.status(500).json({ error: "Failed to create subject" });
      }
      res
        .status(201)
        .json({ message: "Subject created successfully", subjectId });
    }
  );
});

// API to get subjects by semester ID
app.get("/api/subject/:semesterId", (req, res) => {
  const { semesterId } = req.params;
  getSubjectsBySemesterId(semesterId, (err, subjects) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch subjects" });
    }
    res.status(200).json({ subjects });
  });
});

// API to update subject by ID
app.put("/api/subject/:id", (req, res) => {
  const { id } = req.params;
  const { subjectName, subjectCode, IAMarks, EAMarks, total, result } =
    req.body;
  updateSubject(
    id,
    subjectName,
    subjectCode,
    IAMarks,
    EAMarks,
    total,
    result,
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to update subject" });
      }
      res
        .status(200)
        .json({ message: `Subject with ID ${id} updated successfully` });
    }
  );
});

// API to delete subject by ID
app.delete("/api/subject/:id", (req, res) => {
  const { id } = req.params;
  deleteSubject(id, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete subject" });
    }
    res
      .status(200)
      .json({ message: `Subject with ID ${id} deleted successfully` });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
