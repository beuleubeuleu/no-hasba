const { abstractFactory } = require("../dependency/abstractFactory");
const getExpenses         = require("express").Router();

getExpenses.get("/:idGroup/expenses", async(req, res) => {
      const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
      const expenses = await triGroup.getExpensesOfGroupById(req.params.idGroup)
      console.log(expenses)
      if ( expenses.length === 0 ) return res.status(404).json({ success: false, message: "error: no expenses found" })
      res.status(200).json({ success: true, expenses })
    }
)

module.exports = getExpenses;