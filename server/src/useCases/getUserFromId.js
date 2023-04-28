const { abstractFactory } = require("../dependency/abstractFactory");
const getUserFromId       = require("express").Router();

getUserFromId.get("/users/:idUser", async(req, res) => {
      const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
      const user     = await triGroup.getUserFromId(req.params.idUser)

      if ( user.length === 0 ) return res.status(404).json({ success: false, message: "error: user not found" })
      res.status(200).json({ success: true, user })
    }
)

module.exports = getUserFromId;