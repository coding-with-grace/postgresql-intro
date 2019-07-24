const express = require('express')
const app = express()
const client = require('./db/index')
const studentList = require('./views/studentList')

app.use(express.static(__dirname + "/public"));

app.get('/', async (req, res, next) => {
    try {
        const data = await client.query('SELECT * FROM students')
        const students = data.rows
        res.send(studentList(students))
    } catch (error) {
        next(error)
    }
})

app.get('/students/:id', async (req, res, next) => {
    try {
        const student = await client.query('SELECT * FROM students where students.id = $1', [req.params.id])
        const studentInfo = (student.rows[0])
        res.send(`<html>
            <body>
                <div>${studentInfo.name} studies ${studentInfo.major}.</div>
            </body>
        </html>`)
    } catch (error) {
        next(error)
    }
})

const PORT = 1337

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
