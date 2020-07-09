const connection = require("../config/db")
const crypto = require("crypto")
const { updateSetPwdToken, updateSetNewPassword } = require('../utils/utils')
const {sendmailPasswordForgot} = require('../utils/sendMail')
const {  validationResult } = require('express-validator');

exports.forgotpwd = (req, res) => {
    const {email} = req.body
    const errorFormatter = ({ msg }) => { return `${msg}`};
	var error_result = validationResult(req).formatWith(errorFormatter);

	if(!error_result.isEmpty()){
		return res.json({ 
			success: false,
			error: error_result.array(),
		});
	}
    connection.query("SELECT * FROM user WHERE email = ?", [email], (errors, results) => {
        if(results[0]){
            const password_token = crypto.randomBytes(64).toString('hex');
            updateSetPwdToken(password_token, email)
            sendmailPasswordForgot(email, "Mot de passe oublié", password_token)
            res.json({
                success: true,
                message: "password emaiil sent"
            })
        } else {
            res.json({
                success: false,
                error: "EMAIL_DSNT_EXIST",
                message: "We didint find your email"
            })
        }
    })       
}

exports.changepwd = (req, res) => {
    const {email, token} = req.query
    const {password, passwordConfirm} = req.body
    const errorFormatter = ({ msg }) => { return `${msg}`};
	var error_result = validationResult(req).formatWith(errorFormatter);

	if(!error_result.isEmpty()){
		return res.json({ 
			success: false,
			error: error_result.array(),
		});
	}
    if(password !== passwordConfirm){
        res.json({
            success: false,
            error: "PASSWORD_NOT_MATCH",
            message: "Error password do not match"
        })
    }
    connection.query("SELECT * FROM user WHERE email = ?", [email], (error, results) =>{
        if(results[0]){
            if(results[0].password_token === token){
                updateSetNewPassword(password, email)
                res.json({
                    success: true,
                    message: "Password Changed"
                })
            } 
        } 
    })
}

exports.checkChangePwd = (req, res) => {
    const {email, token} = req.query
    connection.query("SELECT * FROM user where email = ?", [email], (error, results) => {
        if(results[0]){
            if(results[0].password_token !== token){
                res.json({
                    success: false,
                    error: "WRONG_TOKEN",
                    message: "Wrong Token",
                    redirectUrl: "/error?error=incorrect_token"
                })
            }
        } else {
            res.json({
                success: false,
                error: "WRONG_EMAIL",
                message: "Incorrect Email",
                redirectUrl: "/error?error=incorrect_email" 
            })
        }
    })
}