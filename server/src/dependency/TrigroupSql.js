const InterfaceTrigroup = require("../class/InterfaceTrigroup")
const mysql = require('mysql2/promise');

class TrigroupSql extends InterfaceTrigroup {
  constructor(config) {
    super();
    this.config = config;
  }

  async getGroups(){
    const connection = await mysql.createConnection(this.config);
    const [rows, fields] = await connection.execute('SELECT * FROM trigroup');
    await connection.end();
    console.log(rows, fields)
    return rows;
  }

  async getGroupById(idGroup){
    const connection = await mysql.createConnection(this.config);
    const [rows, fields] = await connection.execute('SELECT * FROM trigroup WHERE trigroup_id = ' + idGroup);
    await connection.end();
    console.log(rows)
    return rows;
  }
}

module.exports = TrigroupSql