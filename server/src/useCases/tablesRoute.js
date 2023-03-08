//get all tables
tablesRouter.get("/", async(req, res) => {
  fs.readFile("./data/tables.json", "utf8", (err, data) => {
    res.send(data)
  })
})
