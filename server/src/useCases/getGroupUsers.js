const { abstractFactory } = require("../dependency/abstractFactory");
const getGroupUsers       = require("express").Router();

getGroupUsers.get("/:idGroup/users", async(req, res) => {
        const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
        const users    = await triGroup.getGroupUsers(req.params.idGroup)

        if ( users.length === 0 ) return res.status(404).json({ success: false, message: "error: users not found" })
        res.status(200).json({ success: true, users })
    }
)

module.exports = getGroupUsers;