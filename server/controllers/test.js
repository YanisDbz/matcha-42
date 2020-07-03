console.log(email + ' ' + password)
		if (!email || !password) {
			return res.json({
				success: false,
				error: "EMPTY_DATA",
				message: "Please provide an email and password",
			});
		}
		connection.query(
			"SELECT * FROM user WHERE email = ?",
			[email],async (error, results) => {
					if(error) {
						console.error(error)
					}
					const check = bcrypt.compare(password, results[0].password)
					if(!check){
					res.json({
						success: false,
						error: "EMAIL_OR_PASSWORD_IS_INVALID",
						message: "Email or Password is incorrect",
					});
				} else if (results[0].activate !== 1){
					res.json({
						success: false,
						error: "USER_ACCOUNT_NOT_ACTIVATED",
						message: "Please check your email to verify your account"
					})
				} else {
					console.log(results);
					const id = results[0].id;

					const token = jwt.sign({ id }, process.env.JWT_SECRET, {
						expiresIn: process.env.JWT_EXPIRES_IN,
					});

					console.log("The JWT token is : " + token);

					const cookieOptions = {
						expires: new Date(
							Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
						),
						httpOnly: true,
					};
					res.cookie("jwt", token, cookieOptions);
					if (error) {
						console.error(error);
					} else {
						res.json({
							success: true,
							message: "User Login success",
						});
					}
				}
			}
		);