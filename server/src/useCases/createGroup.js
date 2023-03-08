const tables      = require("../data/tables.json");
const fs          = require("fs");
const createGroup = require("express").Router();
createGroup.post('/', async(req, res) => {
  console.log("request body", req.body)
  const newData = req.body

  let arrayOfId = tables.map(d => d.id);
  console.log("ids are ", arrayOfId)
  newData.expenses = []
  newData.id       = tables.length >= 1 ? Math.max(...arrayOfId) + 1 : 1
  fs.readFile("../data/tables.json", "utf8", (err, data) => {
    const json = JSON.parse(data)
    json.push(req.body)
    fs.writeFile("../data/tables.json", JSON.stringify(json), (err) => {
      if ( err ) throw err
      res.sendStatus(200)
    })
  })
})

module.exports = createGroup;