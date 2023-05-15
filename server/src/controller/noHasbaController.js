const { initGroup } = require("../useCases/initGroup");

exports.initializeGroup = async (req, res) => {
  try {
    const { name, description, username } = req.body;
    if (!name || !description || !username) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
      });
    }

    const [group, firstUser] = await initGroup(req.body);
    if (!group || !firstUser) {
      return res.status(500).json({
        success: false,
        message: "Failed to initialize group.",
      });
    }

    res.status(201).json({
      success: true,
      group,
      firstUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
