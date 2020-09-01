const connection = require("../config/db")
const jwt = require("jsonwebtoken")

const getTagData = (req, res) => {
  const jwt_token = req.cookies.login
  if(jwt_token) {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
    user_id = decode.id
    connection.query("SELECT * FROM user_tag WHERE id = ?", [user_id], (error, results) => {
      if(results[0]){
        console.log(results[0])
        return res.json({
          sucess: true
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

module.exports = getTagData