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

const checkmail = (email) => {
  connection.query("SELECT * FROM user WHERE email = ?", [email], (error, results) => {
    if(results[0]){
      return true
    } else {
      return false
    }
  })
}

module.exports = {accountactivated, checkmail}