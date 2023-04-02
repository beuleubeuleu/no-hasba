const TrigroupJson = require("./TrigroupJson");
const TrigroupSql = require("./TrigroupSql")

exports.abstractFactory = (tech) => {
  if (tech === "json") return new TrigroupJson
  if (tech === "sql") return new TrigroupSql
  throw new Error("Invalid")
}