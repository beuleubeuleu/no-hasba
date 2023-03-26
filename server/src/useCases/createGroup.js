const { abstractFactory } = require("../dependency/abstractFactory");
const createGroup         = require("express").Router();
createGroup.post('/', async(req, res) => {

  const triGroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
  await triGroup.createGroup(req.body)
  res.send("ok")


})

module.exports = createGroup;