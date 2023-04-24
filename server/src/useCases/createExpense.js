const { abstractFactory } = require("../dependency/abstractFactory");
const createExpense       = require("express").Router();

createExpense.post("/:idGroup/expenses/create", async(req, res) => {
  try {
    const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
    await triGroup.createExpense(req.params.idGroup, req.body)
    res.status(201).json({ success: true })
  } catch ( err ) {
    res.status(500).json({ success: false, message: err })
  }
})

module.exports = createExpense