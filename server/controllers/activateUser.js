const connection = require("../config/db");
const { accountactivated } = require('../utils/utils')

exports.activate = (req, res) => {
  const {email, token} = req.query
  console.log("email :" + email)
  console.log("token :" + token)
  connection.query("SELECT * FROM user WHERE email = ?", [email], (error, results) => {
    if(error) {
      console.log("activate server" + error)
    } else {
      if(token === results[0].activate_token && results[0].activate === 0){
        accountactivated(email)
        res.json({
          success: true,
          message: "User activated"
        })
      } else if (results[0].activate === 1 && results[0].activate_token === null) {
        res.json({
          success: false,
          error: "ALREADY_ACTIVE",
          message: "Token already use and user already ACTIVE"
        })
      } else {
        res.json({
          success: false,
          error: "WRONG_TOKEN",
          mesage: "Token is invalid"
        })
      }
    }
  })
}
