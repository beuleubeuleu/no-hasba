const express = require('express');
const app     = express()

const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') });


const port                    = process.env.PORT || 4000
const nohasbaRouter       = require('./routes/noHasbaRoute');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/noHasba", nohasbaRouter)

app.listen(port, () => {
  console.log(`port ${ port } lets goooooo!!!`)
})

module.exports = app