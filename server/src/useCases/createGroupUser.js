const { abstractFactory } = require("../dependency/abstractFactory");
const createGroupUser     = require("express").Router();
createGroupUser.post('/:idGroup/users', async(req, res) => {
  const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
  if ( !req.body.username || !req.params.idGroup ) return res.status(400).json({ message: "bad request" })
  const newUser = await triGroup.createGroupUser(req.body.username, req.params.idGroup)
  res.status(201).json({ success: true, newUser })

})

module.exports = createGroupUser;