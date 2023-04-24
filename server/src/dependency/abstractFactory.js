const TrigroupJson = require("./TrigroupJson");
const TrigroupSql  = require("./TrigroupSql")

exports.abstractFactory = (tech) => {
  if ( tech === "json" ) return new TrigroupJson
  if ( tech === "sql" ) return new TrigroupSql({
    host    : process.env.SQL_CONFIG_HOST,
    database: process.env.SQL_CONFIG_DB,
    port    : process.env.SQL_CONFIG_PORT,
    user    : process.env.SQL_CONFIG_USER,
    password: process.env.SQL_CONFIG_PASSWORD
  })
  throw new Error("Invalid")
}