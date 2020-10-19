const jwt = require("jsonwebtoken")
const {updateUserGender} = require("../../../utils/utils.js")


const editGender = (req, res) => {
  const jwt_token = req.cookies.login

  if (jwt_token) {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
    const user_id = decode.id
    const {gender} = req.body
    if(gender){
      updateUserGender(user_id, gender)
      return res.json({
        success: true,
        message: "User Gender updated"
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

module.exports = editGender