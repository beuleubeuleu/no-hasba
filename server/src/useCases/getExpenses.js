const { injectDependency } = require("./dependency/injectDependency");
const getExpenses          = require("express").Router();

getExpenses.get("/:idGroup/expenses", async(req, res) => {

      const triGroup = injectDependency("json")
      const expenses = await triGroup.getExpensesOfGroupById(req.params.idGroup)
      if ( expenses ) return res.send({ success: true, expenses })
      res.status(404).send({ success: false, message: "error: group not found" })
    }
)

module.exports = getExpenses;