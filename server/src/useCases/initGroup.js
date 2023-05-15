const { abstractFactory } = require("../dependency/abstractFactory");

exports.initGroup = async(body) => {
  const Trigroup = abstractFactory(process.env.TRIGROUP_REPOSITORY_INJECTION_TOKEN)
  const group = await Trigroup.createGroup(body)
  const firstUser = await Trigroup.createGroupUser(body.username, group.id)
  return [group, firstUser]
}