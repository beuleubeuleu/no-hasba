const express = require('express');

const app = express()
const port = process.env.PORT || 4000

const tablesRouter = require('./routes/tablesRoute');
app.use(express.json())
app.use("/tables", tablesRouter);


app.listen(port, () => {
  console.log(`port ${port} lets goooooo!!!`)
})