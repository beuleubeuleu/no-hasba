const { abstractFactory } = require("../dependency/abstractFactory");
const getContributorsOfExpense       = require("express").Router();

getContributorsOfExpense.get("/expenses/contributors/:idExpense", async(req, res) => {
      const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
      const contributors     = await triGroup.getContributorsOfExpense(req.params.idExpense)

      if ( contributors.length === 0 ) return res.status(404).json({ success: false, message: "error: contributors not found" })
      res.status(200).json({ success: true, contributors })
    }
)

module.exports = getContributorsOfExpense;