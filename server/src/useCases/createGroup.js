const { abstractFactory } = require("../dependency/abstractFactory");
const createGroup         = require("express").Router();
createGroup.post('/', async(req, res) => {
  const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
  if ( !req.body.name || !req.body.username || !req.body.description ) return res.status(400).json({ message: "bad request" })
  const newGroup = await triGroup.createGroup(req.body)
  const newUser  = await triGroup.createGroupUser(req.body.username, newGroup.id)
  res.status(201).json({ success: true, newGroup, newUser })

})

module.exports = createGroup;