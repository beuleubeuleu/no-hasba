const { abstractFactory } = require("../dependency/abstractFactory");
const createExpense       = require("express").Router();

createExpense.post("/:idGroup/expenses", async(req, res) => {

  const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
  await triGroup.createExpense(req.params.idGroup, req.body)
  res.send("ok")
})

module.exports = createExpense