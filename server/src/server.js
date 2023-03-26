const express = require('express');
const app     = express()

const port                = process.env.PORT || 4000
const createGroupRouter   = require('./useCases/createGroup');
const getGroupRouter      = require('./useCases/getGroup');
const createExpenseRouter = require('./useCases/createExpense');
const getExpensesRouter   = require('./useCases/getExpenses');

app.use(express.json())
app.use(express.urlencoded({extended:true }))

app.use("/group", createGroupRouter);
app.use("/group", getGroupRouter);
app.use("/group", createExpenseRouter);
app.use("/group", getExpensesRouter);


app.listen(port, () => {
  console.log(`port ${ port } lets goooooo!!!`)
})

module.exports = app