const TrigroupJson = require("./TrigroupJson");

exports.abstractFactory = (tech) => {
  if (tech === "json") return new TrigroupJson
  throw new Error("Invalid")
}