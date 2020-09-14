const connection = require("../config/db")
const jwt = require("jsonwebtoken")

const getUserImage = (req, res) => {
  const  jwt_token  = req.cookies.login
  
  if(jwt_token){
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
    user_id = decode.id
    connection.query("SELECT * FROM user_image WHERE user_id = ?", [user_id], (error, results) => {
      if(error) {
        console.log(error)
        return error
      } else {        
        return res.json({
          success: true,
          img1: results[0].img1,
          img2: results[0].img2,
          img3: results[0].img3,
          img4: results[0].img4,
          img5: results[0].img5
        })
      }
    })
  } else {
    return res.json({
      success: false,
      error: "USER_NOT_LOGGED",
      message: "User not logged"
    })
  }
}

module.exports = getUserImage