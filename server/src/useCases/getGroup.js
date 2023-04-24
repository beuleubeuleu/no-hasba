const { abstractFactory } = require("../dependency/abstractFactory");
const getGroup            = require("express").Router();

getGroup.get("/:idGroup", async(req, res) => {
      try {
        const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
        const group    = await triGroup.getGroupById(req.params.idGroup)

        if (!group) res.status(404).json({ success: false, message: "error: group not found" })
        res.status(200).json({ success: true, group })
      } catch ( err ) {
        res.status(500).json({ success: false, message: err.message })
      }
    }
)

module.exports = getGroup;