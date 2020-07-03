const connection = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto")
const { validationResult } = require('express-validator');
const sendmail = require('../utils/sendMail')

exports.login = (req, res) => {
	const { email, password } = req.body;
	const errorFormatter = ({ msg }) => { return `${msg}`};
	var error_result = validationResult(req).formatWith(errorFormatter);
	if(!error_result.isEmpty()){
		console.log(error_result)
		return res.json({ 
			success: false,
			error: error_result.array(),
			message: error_result
		});
	}
	connection.query("SELECT * FROM user WHERE email = ?", [email], (error, results) => {
		if(!results[0]){
			res.json({
				success: false,
				error: "EMAIL_DSNT_EXIST",
				message: "Email does not exist"
			})
		}
		bcrypt.compare(password, results[0].password, function(err, res) {
			if (err){
				
			}
			if (res){
			} else {
			}
		})
	})
}

exports.register = (req, res) => {
	const today = Date.now();
	const activate_token = crypto.randomBytes(64).toString('hex');
	const { firstname, lastname, email, password, passwordConfirm } = req.body;
	const errorFormatter = ({ msg }) => { return `${msg}`};
	var error_result = validationResult(req).formatWith(errorFormatter);

	if(!error_result.isEmpty()){
		console.log(error_result)
		return res.json({ 
			success: false,
			error: error_result.array(),
			message: error_result
		});
	}
	connection.query(
		"SELECT email FROM user WHERE email = ?",
		[email],
		(error, results) => {
			if (error) {
				console.error(error);
			}
			if (results[0]) {
				return res.json({
					success: false,
					error: "EMAIL_ALREADY_EXIST",
					message: "Email already exists",
				});
			} else if (password !== passwordConfirm) {
				return res.json({
					success: false,
					error: "PASSWORD_NOT_MATCH",
					message: "password do not match",
				});
			}
			bcrypt.hash(password, 10, function (err, hash) {
				connection.query(
					"INSERT INTO user SET ?",
					{
						firstname: firstname,
						lastname: lastname,
						email: email,
						password: hash,
						created: today,
						activate_token: activate_token
					},
					(error, results) => {
						if (error) {
							console.error(error);
						} else {
							console.log(results);
							sendmail(email, "Activation de compte", activate_token)
							res.json({
								success: true,
								message: "User Registered",
							});
						}
					}
				);
			});
		}
	);
};
