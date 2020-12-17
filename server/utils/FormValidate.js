const { getAge } = require("./utils");

const isEmpty = (data) => {
  if(data === "" || data === null || !data){
    return true
  } else {
    return false
  }
}

const isEmail = (email) => {
  var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  var valid  = emailRegex.test(email)
  if(valid){
    return true
  } else {
    return false
  }
}

module.exports = { isEmpty, isEmail }