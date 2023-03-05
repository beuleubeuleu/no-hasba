const express = require('express');
const fs      = require('fs');
const data    = require("./data.json")

const app = express()
app.use(express.json())
app.get('/', (req, res) => {
  console.log("hello world")
})
app.get("/tables", async(req, res) => {
  res.send(data)
})


//create a new table
app.post('/tables', async(req, res) => {
  console.log("request body", req.body)
  const newData = req.body

  let arrayOfId = data.map(d => d.id);
  console.log("ids are ", arrayOfId)
  newData.id = data.length >= 1? Math.max(...arrayOfId) + 1: 1
  fs.readFile("./data.json", "utf8", (err, data) => {
    const json = JSON.parse(data)
    json.push(req.body)
    console.log(json)
    fs.writeFile("./data.json", JSON.stringify(json), (err) => {
      if ( err ) throw err
    })
  })
})

app.listen(4000, () => {
  console.log('port 4000 lets goooooo!!!')
})