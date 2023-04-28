const { abstractFactory } = require("../dependency/abstractFactory");
const getBeneficiariesOfExpense       = require("express").Router();

getBeneficiariesOfExpense.get("/expenses/beneficiaries/:idExpense", async(req, res) => {
      const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
      const beneficiaries     = await triGroup.getBeneficiariesOfExpense(req.params.idExpense)

      if ( beneficiaries.length === 0 ) return res.status(404).json({ success: false, message: "error: beneficiaries not found" })
      res.status(200).json({ success: true, beneficiaries })
    }
)

module.exports = getBeneficiariesOfExpense;