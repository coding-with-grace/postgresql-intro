const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.redirect('/students')
})

app.use('/students', require('./routes/students'))
app.use('/colleges', require('./routes/colleges'))

const PORT = 1337

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
