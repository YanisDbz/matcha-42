const connection = require("../config/db")
const jwt = require("jsonwebtoken")

const getDataFromCookie = (req, res) => {
  const  jwt_token  = req.cookies.login
  if(jwt_token){
    // console.log("Cookies login jwt : " + jwt_token)
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
    user_id = decode.id
    connection.query("SELECT * FROM user WHERE id = ?", [user_id], (error, results) => {
      if(results[0]){
        res.json({
          success: true,
          user: results[0]
        })
      }
    })
  } else {
    // console.log("Cookie login dsnt existe");
    res.json({
      success: false,
      error: "USER_NOT_LOGGED",
      message: "User not logged"
    })
  }
}

module.exports = getDataFromCookie