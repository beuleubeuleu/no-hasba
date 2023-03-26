const fs                = require("fs/promises");
const InterfaceTrigroup = require("../class/InterfaceTrigroup");

class TrigroupJson extends InterfaceTrigroup {

  async getGroups(){
    let groups = await fs.readFile("/Users/beuleu/Projects/tri-count-clone/server/src/data/tables.json", "utf8")
    groups     = JSON.parse(groups)
    return groups
  }

  async getGroupById(idGroup){
    let groups  = await fs.readFile("/Users/beuleu/Projects/tri-count-clone/server/src/data/tables.json", "utf8")
    groups      = JSON.parse(groups)
    const group = groups.filter(group => group.id == idGroup)[0]
    return group ? group : undefined
  }

  async getExpensesOfGroupById(idGroup){
    let groups  = await fs.readFile("/Users/beuleu/Projects/tri-count-clone/server/src/data/tables.json", "utf8")
    groups      = JSON.parse(groups)
    const group = groups.filter(group => group.id == idGroup)[0]
    return group ? group.expenses : undefined
  }

  async createGroup(body){
    const groups  = await this.getGroups()
    let arrayOfId = groups.map(d => d.id);

    const { title, name, description, participants } = body
    const newGroup                                   = {
      title,
      name,
      description,
      participants: participants.split(' ')
    }
    newGroup.expenses                                = []
    newGroup.id                                      = groups.length >= 1 ? Math.max(...arrayOfId) + 1 : 1

    const newData = [ ...groups, newGroup ]

    await fs.writeFile("/Users/beuleu/Projects/tri-count-clone/server/src/data/tables.json", JSON.stringify(newData), (err) => {
      if ( err ) throw err
    })
  }

  async createExpense(idGroup, body){
    const groups       = await this.getGroups()
    const group        = groups.find(group => group.id == idGroup)
    const indexOfGroup = groups.indexOf(group)

    const { what, who_paid, amount, for_ } = body
    const newExpense                      = {
      what,
      who_paid,
      amount,
      for_: for_.split(" ")
    }
    const arrayOfExpensesId               = group.expenses.map(d => d.id);
    newExpense.id                         = group.expenses.length >= 1 ? Math.max(...arrayOfExpensesId) + 1 : 1
    group.expenses.push(newExpense)

    groups[indexOfGroup] = group
    await fs.writeFile("/Users/beuleu/Projects/tri-count-clone/server/src/data/tables.json", JSON.stringify(groups), (err) => {
      if ( err ) throw err
    })
  }

}

module.exports = TrigroupJson