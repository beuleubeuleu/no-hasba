const { abstractFactory } = require("../dependency/abstractFactory");
const createExpense       = require("express").Router();

createExpense.post("/:idGroup/expenses", async(req, res) => {
    const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
    if (!req.body.name || !req.body.amount || !req.body.contributors || !req.body.beneficiaries) return res.status(400).json({ message: "bad request" })
    await triGroup.createExpense(req.body, req.params.idGroup)
    res.status(201).json({ success: true })
})

module.exports = createExpense