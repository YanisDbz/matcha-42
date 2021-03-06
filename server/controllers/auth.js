const connection = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto")
const { validationResult } = require('express-validator');
const {sendmailActivate} = require('../utils/sendMail')
const {userOnline, userOffline} = require('../utils/utils')


exports.login = (req, res) => {
	const { email, password } = req.body;
	const errorFormatter = ({ msg }) => { return `${msg}`};
	var error_result = validationResult(req).formatWith(errorFormatter);
	if(!error_result.isEmpty()){
		return res.json({ 
			success: false,
			error: error_result.array(),
			message: error_result
		});
	}
	connection.query("SELECT * FROM user WHERE email = ?", [email], (error, user) => {
		if(!user[0]){
			return res.json({
				success: false,
				error: "EMAIL_DSNT_EXIST",
				message: "Email does not exist"
			})
		} else {
			bcrypt.compare(password, user[0].password).then((result)=>{
				if(result){
				  console.log("Login Good Password")
				  if(user[0].activate != 1){
					 return res.json({
						  success: false,
						  error: "USER_NOT_ACTIVATE",
						  message: "Please check your mail to verify your account"
					  })
				  }
				  console.log(user);
				  const id = user[0].id;
				  const token = jwt.sign({ id }, process.env.JWT_SECRET);
				  if(userOnline(id)){
					return res.json({
						success: true,
						access_token: token,
						user: user,
						message: "User Login success"
					});
				  }
				} else {
				  console.log("Login wrong password")
				  return res.json({
					success: false,
					error: "WRONG_PASSWORD",
					message: "Wrong password"
				  })
				}
			  })
		}
	})
		
}

exports.register = (req, res) => {
	const today = Date.now();
	const activate_token = crypto.randomBytes(64).toString('hex');
	const { firstname, lastname, email, password, passwordConfirm } = req.body;
	const errorFormatter = ({ msg }) => { return `${msg}`};
	var error_result = validationResult(req).formatWith(errorFormatter);

	if(!error_result.isEmpty()){
		return res.json({ 
			success: false,
			error: error_result.array(),
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
					message: "Password do not match",
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
							return error
						} else {
							console.log(results);
							sendmailActivate(email, "Activation de compte", activate_token)
							return res.json({
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

exports.logout = (req, res) => {
	const jwt_token = req.cookies.login
 
	if(jwt_token){
	   const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
	   const user_id = decode.id
	   if(userOffline(user_id)){
		   return res.json({
			   success: true,
			   id: user_id
		   })
	   }
	} else {
		return res.json({
			success: false,
			error: "USER_NOT_LOGGED"
		})
	}
}