
const pool = require('../../db');
const queries = require('./queries');


const getStudents = (req, res) => {
    // console.log('getting students');
    pool.query(queries.getStudents, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}
const getStudentsById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}
const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length > 0) {
            res.status(400).json({ "msg": "email already exists" });
        }
        // add students to database
        pool.query(queries.addStudent, [name, email, age, dob], (error, response) => {
            if (error) throw error;
            res.status(201).json({ "msg": "student created successfully !" });
        })
    })
}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.status(400).json({ "msg": "No students found" });
        }
        if (error) throw error;
        pool.query(queries.removeStudent, [id], (error, response) => {
            if (error) throw error;
            res.status(201).json({ "msg": "student removed sucessfully" });
        })
    })
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    pool.query(queries.getStudentsById, [id], (error, response) => {
        if (error) throw error;
        const studentfound = response.rows.length;
        if (!studentfound) {
            res.status(400).json({ "msg": "Student not found with that ID" });
        }
        pool.query(queries.updateStudent, [name, id], (error, response) => {
            if (error) throw error;
            res.status(201).json({ "msg": "student updated" });
        })
    })
}

module.exports = { getStudents, getStudentsById, addStudent, removeStudent, updateStudent };