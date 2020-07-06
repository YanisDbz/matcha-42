const connection= require("../config/db")
const bcrypt = require("bcrypt");


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

const updateSetPwdToken = (token, email) => {
  connection.query("UPDATE user SET ? WHERE email = ?",
  [{password_token: token}, email], (error, results) => {
    if(error) {
      console.log("updatepasswordtoken error" + error)
      throw error
    } else {
      console.log("Password token updated")
    }
  })
}

const updateSetNewPassword = (password, email) => {
  bcrypt.hash(password, 10, function(err, hash) {
    connection.query("UPDATE user SET ? WHERE email = ?",
    [{password: hash, password_token: null}, email], (error, results) => {
      if(error) {
        console.log("New Password change error" + error)
      } else {
        console.log("Password changed success")
      }
    })
  });
}
module.exports = { accountactivated, updateSetPwdToken, updateSetNewPassword }