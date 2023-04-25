const { abstractFactory } = require("../dependency/abstractFactory");
const getAllGroups        = require("express").Router();

getAllGroups.get("/all", async(req, res) => {
        const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
        const groups   = await triGroup.getGroups()

        if ( !groups ) return res.status(404).json({ success: false, message: "error: groups not found", groups: groups })
        res.status(200).json({ success: true, groups })
    }
)

module.exports = getAllGroups;