const { injectDependency } = require("./dependency/injectDependency");
const createGroup          = require("express").Router();
createGroup.post('/', async(req, res) => {

  const triGroup = injectDependency("json")
  await triGroup.createGroup(req.body)
  res.send("ok")


})

module.exports = createGroup;