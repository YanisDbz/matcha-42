const connection= require("../config/db")


const accountactivated = (email) => {
  connection.query("UPDATE user SET ? WHERE email = ?", 
  [{activate: 1, activate_token: null}, email], (error, results) => {
    if(error) {
      console.log("accountacvited error" + error)
      throw error
    } else {
      console.log("Update user activated success")
    }
  })
}

module.exports = accountactivated