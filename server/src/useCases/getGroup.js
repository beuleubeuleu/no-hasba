const fs       = require("fs");
const getGroup = require("express").Router();

getGroup.get("/:idgroup", async(req, res) => {
  fs.readFile("/Users/beuleu/Projects/tri-count-clone/server/src/data/tables.json", "utf8", (err, data) => {
    const group = JSON.parse(data).find(t => t.id == req.params.idgroup)
    if ( group ) return res.send(group)
    res.sendStatus(404)
  })
})

module.exports = getGroup;