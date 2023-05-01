const { abstractFactory } = require("../dependency/abstractFactory");
const getGroupTotalDebt   = require("express").Router();

getGroupTotalDebt.get("/:idGroup/debt", async(req, res) => {
      const triGroup       = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
      const groupTotalDebt = await triGroup.getGroupTotalDebt(req.params.idGroup)

      if ( !groupTotalDebt ) return res.status(404).json({ success: false, message: "error: debts not found", groupTotalDebt })
      res.status(200).json({ success: true, groupTotalDebt})
    }
)

module.exports = getGroupTotalDebt;