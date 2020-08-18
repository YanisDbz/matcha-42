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

const setImgProfil = (path_img, user_id) => {
  connection.query("UPDATE user SET ? where id = ?", [{imgprofil: path_img, verify: "1"}, user_id], (error, results) => {
    if(error){
      console.log("set imgprofil error\n" + error);
      return error
    } else {
      console.log("Imgprofil Set")
      return true
    }
  })
}
const setUserTag = (tag, value) => {
  connection.query(`INSERT INTO tag(${tag},user_id) VALUES(?)`, [value], (error, results) => {
    if(error){
      console.log(error);
      return error
    } else {
      console.log("User Tag Set");
      return true
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

const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}
module.exports = { accountactivated, updateSetPwdToken, updateSetNewPassword, getAge, setUserTag, setImgProfil }