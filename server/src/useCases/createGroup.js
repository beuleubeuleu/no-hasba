const { abstractFactory } = require("../dependency/abstractFactory");
const createGroup         = require("express").Router();
createGroup.post('/create', async(req, res) => {
  try {
    const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
    await triGroup.createGroup(req.body)
    res.status(201).json({ success: true })
  } catch (err) {
    res.status(500).json({success: false, message: err.message})
  }

})

module.exports = createGroup;