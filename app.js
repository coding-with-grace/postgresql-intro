const express = require('express')
const app = express()
const client = require('./db/index')

app.use(express.static(__dirname + "/public"));

app.get('/', async (req, res, next) => {
    try {
        const data = await client.query('SELECT * FROM students')
        const students = data.rows
        // res.send(students)
        res.send(`
            <html>
                <body>
                    ${students.map((student) =>
                        `<div>
                            <p>${student.name} studies ${student.major}.</p>
                        </div>`
                    ).join('')}
                </body>
            </html>
        `)
    } catch (error) {
        next(error)
    }
})

const PORT = 1337

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
