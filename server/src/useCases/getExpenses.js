const { abstractFactory } = require("../dependency/abstractFactory");
const getExpenses         = require("express").Router();

getExpenses.get("/:idGroup/expenses", async(req, res) => {
      try {
        const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
        const expenses = await triGroup.getExpensesOfGroupById(req.params.idGroup)

        if ( !expenses ) return res.status(404).json({ success: false, message: "error: group not found" })
        res.status(200).json({ success: true, expenses })
      } catch ( err ) {
        res.status(500).json({ success: false, message: err.message })
      }
    }
)

module.exports = getExpenses;