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

  async getContributorsOfExpense(idExpense){
    const connection = await mysql.createConnection(this.config);
    try {
      const [ rows, fields ] = await connection.execute('SELECT user_id FROM expense_contributors WHERE expense_id = ?', [ idExpense ]);
      return rows;
    } catch ( err ) {
      return err
    } finally {
      await connection.end();
    }
  }

  async getBeneficiariesOfExpense(idExpense){
    const connection = await mysql.createConnection(this.config);
    try {
      const [ rows, fields ] = await connection.execute('SELECT user_id FROM expense_beneficiaries WHERE expense_id = ?', [ idExpense ]);
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
      const [ result ] = await connection.execute(
          'INSERT INTO trigroups (name, description) VALUES (?, ?)',
          [ body.name, body.description ]
      );
      if ( !result.affectedRows ) return new Error('failed to create group')

      const [ rows, fields ] = await connection.execute('SELECT * from trigroups WHERE ID = ?', [ result.insertId ])
      return rows[0]
    } catch ( err ) {
      return err
    } finally {
      await connection.end();
    }
  }

  async createGroupUser(name, idGroup){
    const connection = await mysql.createConnection(this.config);
    try {
      const [ result ] = await connection.execute(
          'INSERT INTO users (name, trigroup_id) VALUES (?, ?)',
          [ name, idGroup ]
      );
      if ( !result.affectedRows ) return new Error('failed to create user')

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

  async getUserFromId(idUser){
    const connection = await mysql.createConnection(this.config);
    try {
      const [ rows, fields ] = await connection.execute('SELECT * FROM users WHERE id = ?', [ idUser ])
      console.log("yo", idUser)
      return rows[0];
    } catch ( err ) {
      return err
    } finally {
      await connection.end();
    }
  }

  async createExpense(body, id){
    const connection = await mysql.createConnection(this.config)
    try {
      const [ result ] = await connection.execute(
          'INSERT INTO expenses (trigroup_id, name, amount) VALUES (?, ?, ?)',
          [ id, body.name, body.amount ]
      )
      for ( const contributor of body.contributors ) {
        await connection.execute(
            'INSERT INTO expense_contributors (expense_id, user_id, amount) VALUES (?, ?, ?)',
            [ result.insertId, contributor.id, contributor.amount ]
        )
      }
      for ( const beneficiary of body.beneficiaries ) {
        await connection.execute(
            'INSERT INTO expense_beneficiaries (expense_id, user_id) VALUES (?, ?)',
            [ result.insertId, beneficiary.id ]
        )
      }
    } catch ( err ) {
      console.log(err)
      return err
    } finally {
      await connection.end();
    }
  }

  async getGroupTotalDebt(idGroup){
    const connection = await mysql.createConnection(this.config);

    try {
      const [ expenses ] = await connection.execute('SELECT * FROM expenses WHERE trigroup_id = ?', [ idGroup ]);

      const debts = await Promise.all(expenses.map(async(expense) => {
        const [ contributors ]  = await connection.execute('SELECT * FROM expense_contributors WHERE expense_id = ?', [ expense.id ]);
        const [ beneficiaries ] = await connection.execute('SELECT * FROM expense_beneficiaries WHERE expense_id = ?', [ expense.id ]);

        const contributor       = contributors[0];
        const beneficiariesDebt = (expense.amount / beneficiaries.length).toFixed(2);

        return beneficiaries.map(beneficiary => {
          return {
            borrower: beneficiary.user_id,
            lender  : contributor.user_id,
            amount  : beneficiariesDebt,
          };
        });
      }));

      // Flatten the array of arrays into a single array of objects
      const flattenedDebts = debts.flat();

      // Create an object to store the debts for each user
      const userDebts = {};

      // Calculate the total debt owed to or by each user
      flattenedDebts.forEach((debt) => {
        if ( !(debt.borrower in userDebts) ) {
          userDebts[debt.borrower] = 0;
        }
        if ( !(debt.lender in userDebts) ) {
          userDebts[debt.lender] = 0;
        }
        userDebts[debt.borrower] += Number(debt.amount);
        userDebts[debt.lender] -= Number(debt.amount);
      });

      // Convert the userDebts object into an array of objects
      const userList = Object.keys(userDebts).map((user) => ({
        user,
        debt: userDebts[user].toFixed(2),
      }));

      // Calculate the list of payments to be made between users
      const paymentList = [];
      for ( let i = 0; i < userList.length; i++ ) {
        let user1Debt = userList[i].debt
        for ( let j = i + 1; j < userList.length; j++ ) {
          let user2Debt = userList[j].debt
          const user1   = userList[i];
          const user2   = userList[j];
          if ( user1.debt > 0 && user2.debt < 0 ) {
            const paymentAmount = Math.min(user1Debt, -user2Debt);
            paymentList.push({
              from  : user1.user,
              to    : user2.user,
              amount: paymentAmount.toFixed(2),
            });
            user1Debt -= paymentAmount;
            user2Debt += paymentAmount;
          }
        }
      }

      // Return the user list sorted by debt amount
      return { usersDebt: userList.sort((a, b) => a.debt - b.debt), howToBalance: paymentList };
    } catch ( err ) {
      console.log(err);
      return err;
    } finally {
      await connection.end();
    }
  }


}

module.exports = TrigroupSql