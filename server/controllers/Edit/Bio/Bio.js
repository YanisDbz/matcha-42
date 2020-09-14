const connection = require("../../../config/db")
const jwt = require("jsonwebtoken")


const editUserBio = (req, res) => {
    const  jwt_token  = req.cookies.login
    if(jwt_token){
        const { bio } = req.body
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        user_id = decode.id
        connection.query("UPDATE user SET ? WHERE id = ?", [{bio: bio}, user_id], (error, results) => {
            if(error){
                return error
            } else {
                return res.json({
                    success: true,
                    message: "Success Bio updated"
                })
            }
        })
    } else {
        return res.json({
            success: false,
            error: "USER_NOT_LOG",
            message: "user is not Log"
        })
    }   
}

module.exports = editUserBio