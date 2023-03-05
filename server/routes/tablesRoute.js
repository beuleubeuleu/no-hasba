const tablesRouter = require("express").Router();

const data = require("../data.json");
const fs   = require("fs");
//get all tables
tablesRouter.get("/", async(req, res) => {
  fs.readFile("./data.json", "utf8", (err, data) => {
    res.send(data)
  })
})

//create a new table
tablesRouter.post('/', async(req, res) => {
  console.log("request body", req.body)
  const newData = req.body

  let arrayOfId = data.map(d => d.id);
  console.log("ids are ", arrayOfId)
  newData.expenses = []
  newData.id       = data.length >= 1 ? Math.max(...arrayOfId) + 1 : 1
  fs.readFile("./data.json", "utf8", (err, data) => {
    const json = JSON.parse(data)
    json.push(req.body)
    fs.writeFile("./data.json", JSON.stringify(json), (err) => {
      if ( err ) throw err
      res.sendStatus(200)
    })
  })
})

//get one table
tablesRouter.get("/:id", async(req, res) => {
  fs.readFile("./data.json", "utf8", (err, data) => {
    const table = JSON.parse(data).find(t => t.id == req.params.id)
    if ( table ) return res.send(table)
    res.sendStatus(404)
  })
})

//get expenses of a table
tablesRouter.get("/:id/expenses", async(req, res) => {
  fs.readFile("./data.json", "utf8", (err, data) => {
    const table = JSON.parse(data).find(t => t.id == req.params.id)
    if ( table ) return res.send(table.expenses)
    res.sendStatus(404)
  })
})

module.exports = tablesRouter