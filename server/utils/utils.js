const connection= require("../config/db")
const bcrypt = require("bcrypt");


const setUserImg = (user_id, imgid, imgsrc) => {
  connection.query(`UPDATE user_image SET ${imgid} = ? where user_id = ?`,
  [imgsrc, user_id], (error, results) =>{
    if(error) {
      console.log(error);
      throw error
    } else {
       return true
    }
  })
}


const accountactivated = (email) => {
  connection.query("UPDATE user SET ? WHERE email = ?", 
  [{activate: 1, activate_token: null}, email], (error, results) => {
    if(error) {
      console.log("accountacvited error" + error)
      throw error
    } else {
       return true
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
      return true
    }
  })
}

const setProfilData = (path_img, user_id, age, gender, orientation) => {
  connection.query("UPDATE user SET ? where id = ?", [
    {imgprofil: path_img, verify: "1", age: age, gender: gender, orientation: orientation}, user_id], (error, results) => {
    if(error){
      console.log("set imgprofil error\n" + error);
      return error
    } else {
      console.log("Imgprofil Set")
      return true
    }
  })
}
const setUserTag = (user_id, value) => {
  connection.query(`INSERT INTO user_tag(user_id, tag_id) VALUES(?, ?)`, [user_id, value], (error, results) => {
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
        return true
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
module.exports = { accountactivated, updateSetPwdToken, updateSetNewPassword, getAge, setUserTag, setProfilData, setUserImg}