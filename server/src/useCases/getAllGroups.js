const { abstractFactory } = require("../dependency/abstractFactory");
const getAllGroups        = require("express").Router();

getAllGroups.get("/all", async(req, res) => {
      const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
      const groups   = await triGroup.getGroups()
      if ( groups ) return res.send({ success: true, groups })
      res.status(404).send({ success: false, message: "error: all groups not found", groups: groups })
    }
)

module.exports = getAllGroups;