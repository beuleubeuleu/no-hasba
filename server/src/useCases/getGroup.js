const { abstractFactory } = require("../dependency/abstractFactory");
const getGroup            = require("express").Router();

getGroup.get("/:idGroup", async(req, res) => {

      const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
      const group    = await triGroup.getGroupById(req.params.idGroup)
      if ( group ) return res.send({ success: true, group })
      res.status(404).send({ success: false, message: "error: group not found"})
    }
)

module.exports = getGroup;