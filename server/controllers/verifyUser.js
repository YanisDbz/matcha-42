const connection = require('../config/db')
const fs = require('fs')
const path = require('path')
const {getAge} = require('../utils/utils')
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
  if(errors.length === 0 ){
    console.log(tag)
    if (!fs.existsSync(`./public/img/${user_id}`)){
      fs.mkdirSync(`./public/img/${user_id}`);
    }
    const imgprofil = req.files.image
    const extimg = path.extname(imgprofil.name)
    const date = new Date()
    const imgname = date.getTime() + user_id + extimg
    if(extimg !== ".png" && extimg !== ".jpg"){
      return res.json({
        success: false,
        error: "EXT IMG NOT GOOD",
        message: "Please make sure your img is typ fo png or jpg"
      })
    }
    imgprofil.mv(`./public/img/${user_id}/${imgname}`, err => {
      if(err) throw err
    })
    return res.json({
      success: true,
      message: "U can now see other profiles"
    })
  }
}
module.exports = verify