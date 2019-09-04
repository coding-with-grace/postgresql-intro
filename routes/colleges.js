const express = require('express')
const router = express.Router()
const client = require('../db/index')

router.get('/', async (req, res, next) => {
    try {
        const data = await client.query('SELECT * FROM colleges')
        const colleges = data.rows
        res.send(colleges)
    } catch (error) {
        next(error)
    }
})

router.get('/:name', async (req, res, next) => {
    try {
        const college = await client.query(`SELECT * FROM colleges WHERE colleges.id = $1`, [req.params.name])
        const collegeInfo = college.rows[0]
        res.send(`<html>
            <body>
                <div>Welcome to ${collegeInfo.name} located in ${collegeInfo.city}.</div>
            </body>
        </html>`)
    } catch (error) {
        next(error)
    }
})

module.exports = router
