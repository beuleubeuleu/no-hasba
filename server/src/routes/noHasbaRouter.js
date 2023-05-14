const { initGroup } = require("../useCases/initGroup");
const noHasba       = require("express").Router();

noHasba.post("/", async(req, res) => {
  try{
    initGroup(req.body)
  } catch(err){

  }
})

module.exports = noHasba