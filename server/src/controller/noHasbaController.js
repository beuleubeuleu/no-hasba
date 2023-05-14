import { initGroup } from "../useCases/initGroup";

export const initializeGroup = async(req, res) => {
  if ( !(req.body.name && req.body.description && req.body.username) ) {
    res.status(400).json({
      success: false,
      message: "Bad Request"
    })
  }
  try {
    const [ group, firstUser ] = await initGroup(req.body)
    res.status(201).json({
      success: true,
      group,
      firstUser })
  } catch ( err ) {

  }
}