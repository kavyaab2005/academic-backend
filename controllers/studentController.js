import Student from "../models/Student.js";

export const addStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({ message: "Student added successfully", student });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getStudents = async (req, res) => {
    const students = await Student.find().sort({ score: -1 });
    res.json(students);
};
