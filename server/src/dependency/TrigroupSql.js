const InterfaceTrigroup = require("../class/InterfaceTrigroup")
const mysql             = require('mysql2/promise');

class TrigroupSql extends InterfaceTrigroup {
  constructor(config){
    super();
    this.config = config;
  }

  async getGroups(){
    const connection = await mysql.createConnection(this.config);
    try {
      const [ rows, fields ] = await connection.execute('SELECT * FROM trigroups');
      console.log(rows)
      return rows;
    } catch ( err ) {
      return err
    } finally {
      await connection.end();
    }
  }

  async getGroupById(idGroup){
    const connection = await mysql.createConnection(this.config);
    try {
      const [ rows, fields ] = await connection.execute('SELECT * FROM trigroups WHERE id = ?', [ idGroup ]);
      console.log(rows)
      return rows[0];
    } catch ( err ) {
      return err
    } finally {
      await connection.end();
    }
  }

  async getExpensesOfGroupById(idGroup){
    const connection = await mysql.createConnection(this.config);
    try {
      const [ rows, fields ] = await connection.execute('SELECT * FROM expenses WHERE trigroup_id = ?', [ idGroup ]);
      console.log(rows)
      return rows;
    } catch ( err ) {
      return err
    } finally {
      await connection.end();
    }
  }

  async createGroup(body){
    const connection = await mysql.createConnection(this.config);
    try {
      const [ result ]       = await connection.execute(
          'INSERT INTO trigroups (name, description) VALUES (?, ?)',
          [ body.name, body.description ]
      );
      if (!result.affectedRows) return new Error('failed to create group')

      const [ rows, fields ] = await connection.execute('SELECT * from trigroups WHERE ID = ?', [ result.insertId ])
      return rows[0]
    } catch ( err ) {
      return err
    } finally {
      await connection.end();
    }
  }

  async createGroupUser(name, id){
    const connection = await mysql.createConnection(this.config);
    try {
      const [ result ]       = await connection.execute(
          'INSERT INTO users (name, trigroup_id) VALUES (?, ?)',
          [ name, id ]
      );
      if (!result.affectedRows) return new Error('failed to create user')

      const [ rows, fields ] = await connection.execute('SELECT * from users WHERE id = ?', [ result.insertId ])
      return rows[0]
    } catch ( err ) {
      return err
    } finally {
      await connection.end();
    }
  }

  async getGroupUsers(idGroup){
    const connection = await mysql.createConnection(this.config);
    try {
      const [ rows, fields ] = await connection.execute('SELECT * FROM users WHERE trigroup_id = ?', [ idGroup ]);
      console.log(rows)
      return rows;
    } catch ( err ) {
      return err
    } finally {
      await connection.end();
    }
  }
}

module.exports = TrigroupSql