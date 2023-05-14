const express = require('express');
const app     = express()

const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') });


const port                    = process.env.PORT || 4000
const createGroupRouter       = require('./useCases/initGroup');
const getGroupRouter          = require('./useCases/getGroup');
const getAllGroupsRouter      = require('./useCases/getAllGroups');
const createExpenseRouter     = require('./useCases/createExpense');
const getExpensesRouter       = require('./useCases/getExpenses');
const getContributorsOfExpenseRouter       = require('./useCases/getContributorsOfExpense');
const getBeneficiariesOfExpenseRouter       = require('./useCases/getBeneficiariesOfExpense');
const getGroupUsersRouter     = require('./useCases/getGroupUsers');
const getUserRouter     = require('./useCases/getUserFromId');
const createGroupUserRouter   = require('./useCases/createGroupUser');
const getGroupTotalDebtRouter = require('./useCases/getGroupTotalDebt');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", createGroupRouter);
app.use("/api", getAllGroupsRouter);
app.use("/api", getGroupRouter);
app.use("/api", createExpenseRouter);
app.use("/api", getExpensesRouter);
app.use("/api", getContributorsOfExpenseRouter);
app.use("/api", getBeneficiariesOfExpenseRouter);
app.use("/api", getGroupUsersRouter);
app.use("/api", getUserRouter);
app.use("/api", createGroupUserRouter);
app.use("/api", getGroupTotalDebtRouter);


app.listen(port, () => {
  console.log(`port ${ port } lets goooooo!!!`)
})

module.exports = app