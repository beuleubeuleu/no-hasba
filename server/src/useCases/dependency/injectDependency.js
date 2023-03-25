const TrigroupJson = require("./TrigroupJson");

exports.injectDependency = (tech) => {
  if (tech === "json") return new TrigroupJson
  throw new Error("Invalid")
}