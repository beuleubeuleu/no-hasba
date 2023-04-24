const TrigroupJson = require("./TrigroupJson");
const TrigroupSql  = require("./TrigroupSql")

exports.abstractFactory = (tech) => {
  if ( tech === "json" ) return new TrigroupJson
  if ( tech === "sql" ) return new TrigroupSql({ host: "localhost", database:"tricount_clone" ,port: 8889, user: "root", password: "root" })
  throw new Error("Invalid")
}