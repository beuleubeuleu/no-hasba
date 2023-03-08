const fs          = require("fs");
const getExpenses = require("express").Router();

getExpenses.get("/:idgroup/expenses", async(req, res) => {
  fs.readFile("/Users/beuleu/Projects/tri-count-clone/server/src/data/tables.json", "utf8", (err, data) => {
    const table = JSON.parse(data).find(t => t.id == req.params.idgroup)
    if ( table ) return res.send(table.expenses)
    res.sendStatus(404)
  })
})

module.exports = getExpenses;