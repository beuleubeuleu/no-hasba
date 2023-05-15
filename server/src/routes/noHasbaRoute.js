
const noHasbaRouter       = require("express").Router();
const noHasbaController = require('../controller/noHasbaController')

noHasbaRouter.post("/", noHasbaController.initializeGroup)

module.exports = noHasbaRouter