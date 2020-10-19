const jwt = require("jsonwebtoken")
const {updateProfilImage} = require("../../../utils/utils.js")

const editProfilImg = (req, res) => {
  const jwt_token = req.cookies.login
  
  if(jwt_token){
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
    const user_id = decode.id
    const  { imageName, imageId } = req.body
    if(imageName && imageId){
      updateProfilImage(user_id, imageName)
      return res.json({
        success: true,
        message: "New profil image updated"
      })
    }
  } else {
    return res.json({
      success: false,
      error: "USER_NOT_LOGGED",
      message: "User is not Logged"
    })
  }
}
module.exports = editProfilImg