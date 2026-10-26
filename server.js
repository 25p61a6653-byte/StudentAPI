const express = require("express");

const app = express();

// Middleware to read JSON data
app.use(express.json());

// Temporary student data
let students = [
    {
        id: 6653,
        name: "PRAVEEN",
        age: 18,
        course: "B.Tech",
        email: "Praveen@gmail.com"
    },
    {
        id: 2,
        name: "Sita",
        age: 21,
        course: "B.Tech",
        email: "sita@gmail.com"
    }
];

// Home route
app.get("/", (req, res) => {
    res.send("Student REST API is running");
});

// GET - Get all students
app.get("/students", (req, res) => {
    res.json(students);
});

// GET - Get student by ID
app.get("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// POST - Add new student
app.post("/students", (req, res) => {

    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age,
        course: req.body.course,
        email: req.body.email
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// PUT - Update student
app.put("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.age = req.body.age;
    student.course = req.body.course;
    student.email = req.body.email;

    res.json({
        message: "Student updated successfully",
        student: student
    });
});

// DELETE - Delete student
app.delete("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.json({
        message: "Student deleted successfully"
    });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 
