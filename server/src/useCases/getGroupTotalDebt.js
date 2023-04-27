const { abstractFactory } = require("../dependency/abstractFactory");
const getGroupTotalDebt        = require("express").Router();

getGroupTotalDebt.get("/:idGroup/debt", async(req, res) => {
      const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
      const groupTotalDebt   = await triGroup.getGroupTotalDebt(req.params.idGroup)

      /*if ( !groups ) return res.status(404).json({ success: false, message: "error: groups not found", groups: groups })
      res.status(200).json({ success: true, groups })*/
      res.send({ yea: groupTotalDebt })
    }
)

module.exports = getGroupTotalDebt;