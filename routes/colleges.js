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
                <div>Welcome to ${collegeInfo.college_name} located in ${collegeInfo.city}.</div>
            </body>
        </html>`)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        let collegeData = await client.query('SELECT * FROM colleges WHERE colleges.college_name = $1', [req.body.college_name]);

        if (!collegeData.rows.length) {
            collegeData = await client.query('INSERT INTO colleges (college_name, city) VALUES ($1, $2)', [req.body.college_name, req.body.city]);
        }
    
       console.log('*** REQ.BODY ***', req.body)
       res.redirect('/colleges')
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await client.query(`DELETE FROM colleges WHERE id = ${req.params.id}`)
        res.redirect('/colleges')
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        console.log('HEYY', req.body)
        await client.query(`UPDATE colleges SET college_name = $1, city=$2 WHERE id = $3`, [req.body.college_name, req.body.city, req.params.id])
        res.redirect('/colleges')
    } catch (error) {
        next(error)
    }
})

module.exports = router
