const jwt = require("jsonwebtoken")
const {updateUserOrientation} = require("../../../utils/utils.js")


const editOrientation = (req, res) => {
  const jwt_token = req.cookies.login

  if (jwt_token) {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
    const user_id = decode.id
    const {orientation} = req.body
    if(orientation){
      updateUserOrientation(user_id, orientation)
      return res.json({
        success: true,
        message: "User Orientation updated"
      })
    }
  } else {
    return res.json({
      success: false,
      error: "USER_NOT_LOGGED",
      message: "User is not logged"
    })
  }
}

module.exports = editOrientation