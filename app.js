const express = require('express')
const app = express()

// app.use(express.static(__dirname + "/public"));

app.use('/students', require('./routes/students'))
app.use('/colleges', require('./routes/colleges'))

app.get('/', (req, res) => {
    res.redirect('/students')
})

const PORT = 1337

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
