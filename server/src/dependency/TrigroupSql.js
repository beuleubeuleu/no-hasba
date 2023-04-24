const InterfaceTrigroup = require("../class/InterfaceTrigroup")
const mysql = require('mysql2/promise');

class TrigroupSql extends InterfaceTrigroup {
  constructor(config) {
    super();
    this.config = config;
  }

  async getGroups(){
    const connection = await mysql.createConnection(this.config);
    const [rows, fields] = await connection.execute('SELECT * FROM trigroups');
    await connection.end();
    console.log(rows, fields)
    return rows;
  }

  async getGroupById(idGroup){
    const connection = await mysql.createConnection(this.config);
    const [rows, fields] = await connection.execute('SELECT * FROM trigroups WHERE id = ?', [idGroup]);
    await connection.end();
    console.log(rows)
    return rows[0];
  }

  async getExpensesOfGroupById(idGroup){
    const connection = await mysql.createConnection(this.config);
    const [rows, fields] = await connection.execute('SELECT * FROM expenses WHERE trigroup_id = ?', [idGroup]);
    await connection.end();
    console.log(rows)
    return rows;
  }

  async createGroup(body){

  }

  async getGroupUsers(idGroup){
    const connection = await mysql.createConnection(this.config);
    const [rows, fields] = await connection.execute('SELECT * FROM users WHERE trigroup_id = ?', [idGroup]);
    await connection.end();
    console.log(rows)
    return rows;
  }
}

module.exports = TrigroupSql