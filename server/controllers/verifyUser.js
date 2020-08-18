const connection = require('../config/db')
const fs = require('fs')
const path = require('path')
const {getAge, setUserTag, setImgProfil} = require('../utils/utils')
const { validationResult } = require('express-validator');

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return {
      message: error.msg,
    };
  }
});

const verify = (req, res) => {
  const {date, gender, orientation, user_id, tag} = req.body
  const today = new Date()
  const errors = myValidationResult(req).array()
  const value = tag.split(',')

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.json({
      success: false,
      error: 'NO_PROFIL_IMG',
      message: 'Image is required'
    });
  }
  if(errors.length > 0){
    return res.json({
      success: false,
      error: "EMPTY_FIELD",
      error_len: errors.length,
      message: errors
    })
  }
  if(getAge(date) < 18 || date > today){
    return res.json({
      success: false,
      error: "AGE_NOT_GOOD",
      message: "Yu need to have 18"
    })
  }
  if(value.length < 5){    
    return res.json({
      sucess: false,
      error: "MUST_HAVE_5_TAGS",
      message: "Yu need to chose at least 5 tags"
    })
  }
  if(errors.length === 0 ){
    console.log(value);
    if (!fs.existsSync(`../client/public/img/${user_id}`)){
      fs.mkdirSync(`../client/public/img/${user_id}`);
    }
    const imgprofil = req.files.image
    const extimg = path.extname(imgprofil.name)
    const imgname = today.getTime() + user_id + extimg
    if(extimg !== ".png" && extimg !== ".jpg"){
      return res.json({
        success: false,
        error: "EXT IMG NOT GOOD",
        message: "Please make sure your img is type of png or jpg"
      })
    }
    imgprofil.mv(`../client/public/img/${user_id}/${imgname}`, err => {
      if(err) throw err
    })
    // setImgProfil(`/img/${user_id}/${imgname}`, user_id)
    // setUserTag(tag, value)
    return res.json({
      success: true,
      message: 'Your account is now verified'
    })
  }
}
module.exports = verify