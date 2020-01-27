const express = require('express')
const router = express.Router()
const client = require('../db/index')
const studentList = require('../views/studentList')

router.get('/', async (req, res, next) => {
    try {
        const data = await client.query('SELECT * FROM students JOIN colleges ON students.college = colleges.id')
        const students = data.rows // rows refers to all of our data, and will be stored in an array
        console.log(students) // get an array with each element being an object with student information
        res.send(studentList(students)) // using studentList() function imported from studentList.js
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        // student will be an object containing several other objects as values...
        const student = await client.query('SELECT * FROM students JOIN colleges ON students.college = colleges.id WHERE students.id = $1', [req.params.id])
        console.log(student)
        // we just want the "rows" key, which is an array. At index 0, we have the "row" info from the database
        // rows: [{ id: 1, name: 'Samuel L', major: 'Economics', college: 3} ],...
        const studentInfo = (student.rows[0])
        res.send(`<html>
            <body>
                <div>${studentInfo.name} studies ${studentInfo.major} at ${studentInfo.college_name}.</div>
            </body>
        </html>`)
    } catch (error) {
        next(error)
    }
})

module.exports = router
