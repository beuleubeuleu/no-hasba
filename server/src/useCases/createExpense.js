const fs            = require('fs')
const createExpense = require("express").Router();

createExpense.post("/:id/expenses", async(req, res) => {

  fs.readFile("/Users/beuleu/Projects/tri-count-clone/server/src/data/tables.json", "utf8", (err, data) => {
    const table = JSON.parse(data).find(t => t.id == req.params.id)
    if ( table ) {
      const newData         = req.body
      let arrayOfExpensesId = table.expenses.map(d => d.id);
      newData.id            = table.expenses.length >= 1 ? Math.max(...arrayOfExpensesId) + 1 : 1
      table.expenses.push(newData)
      fs.writeFile("./data/tables.json", JSON.stringify(table), (err) => {
        if ( err ) throw err
        res.sendStatus(200)
      })
    }
  })
})

module.exports = createExpense