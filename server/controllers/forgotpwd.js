const connection = require("../config/db")
const crypto = require("crypto")
const { checkmail } = require('../utils/utils')
const {sendmailPasswordForgot} = require('../utils/sendMail')
const {  validationResult } = require('express-validator');

exports.forgotpwd = (req, res) => {
    const {email} = req.body
    const validate = validationResult(req);
    if(!validate.isEmpty()){
        res.json({
            success: false,
            error: validate.array(),
            message: "Wrong email format"
        })
    }
    if(checkmail(email)){
        console.log("email existe");
    }
    else {
        console.log("email existe pas");
        
    }
}