const connection = require("../../config/db")
const jwt = require("jsonwebtoken")


const editUserBio = (req, res) => {
    const  jwt_token  = req.cookies.login
    
}