const fs                = require("fs/promises");
const InterfaceTrigroup = require("../../class/InterfaceTrigroup");

class TrigroupJson extends InterfaceTrigroup {
   async getGroupById(idGroup){
    let groups  = await fs.readFile("/Users/beuleu/Projects/tri-count-clone/server/src/data/tables.json", "utf8")
    groups      = JSON.parse(groups)
    const group = groups.filter(group => group.id == idGroup)[0]
    return group? group: undefined
  }
}

module.exports = TrigroupJson