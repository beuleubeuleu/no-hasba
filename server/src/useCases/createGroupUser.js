const { abstractFactory } = require("../dependency/abstractFactory");
const createGroupUser         = require("express").Router();
createGroupUser.post('/:idGroup/users', async(req, res) => {
  try {
    const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
    const newGroup = await triGroup.createGroupUser({id: req.params.idGroup, name: req.body.name })
    res.status(201).json({ success: true })
  } catch (err) {
    return res.status(500).json({success: false, message: err.message})
  }

})

module.exports = createGroupUser;