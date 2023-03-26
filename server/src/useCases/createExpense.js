const { injectDependency } = require("./dependency/injectDependency");
const createExpense        = require("express").Router();

createExpense.post("/:idGroup/expenses", async(req, res) => {

  const triGroup = injectDependency("json")
  await triGroup.createExpense(req.params.idGroup, req.body)
  res.send("ok")
})

module.exports = createExpense