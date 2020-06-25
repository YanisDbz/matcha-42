const connection = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


exports.login = async (req, res) => {
  try {
    const {email, password} = req.body

    if(!email || !password) {
      return res.status(400).json("Please provide an email and password")
    }
    connection.query("SELECT * FROM user WHERE email = ?", [email], async (error, results) => {
      if(!results[0] || !(await bcrypt.compare(password, results[0].password))){
        res.status(401).json("Email or Password is incorrect")
      } else {
        console.log(results)
        const id = results[0].id
        
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        })

        console.log("The JWT token is : " + token)

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        }
        res.cookie('jwt', token, cookieOptions)
        res.status(200) // add redirect
        if(error){
          console.error(error)
        } else {
          res.json({
            message: "User Login success"
          })
        }
      }

    })
  } catch (error) {
    console.error(error)
  }
}



exports.register = (req, res) => {
  const today =  Date.now()
  const { firstname, lastname, email, password, passwordConfirm } = req.body
  
  connection.query("SELECT email FROM user WHERE email = ?", [email], (error, results) => {
    if (error) {
      console.error(error)
    }
    if(results[0]) {
      return res.json({
        success: false,
        error: "EMAIL_ALREADY_EXIST",
        message: "Email already exists"
      })
    } else if (password !== passwordConfirm) {
      return  res.json({
        success: false,
        error: "PASSWORD_NOT_MATCH",
        message: "password Do not match"
      })
    }
    bcrypt.hash(password, 10, function(err, hash) {
      connection.query('INSERT INTO user SET ?', {first_name: firstname, last_name: lastname, email: email, password: hash, created: today }, (error, results) => {
        if (error) {
          console.error(error)
        } else {
          console.log(results)
          res.json({
            success: true,
            message: "User Registered"
          })
        }
      })
    })
  })
}