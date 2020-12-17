const jwt = require("jsonwebtoken")
const {isEmpty} = require("../../../utils/FormValidate")
const {CheckPassword, updateSetNewLastname} = require("../../../utils/utils")

const editLastname = (req, res) => {
    const jwt_token = req.cookies.login
    if(jwt_token){
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        const {lastname, password} = req.body
        if(isEmpty(lastname)){
            return res.json({
                success: false,
                error: "LASTNAME_EMPTY_FIELD",
                message: "Lastname is required",
            })
        }
        if(isEmpty(password)){
            return res.json({
                success: false,
                error: "PASSWORD_EMPTY_FIELD",
                message: "PAssword is required",
            })
        }
        CheckPassword(password, user_id, (check) => {
            if(check === false) {
                return res.json({
                    success: false,
                    error: "WRONG_PASSWORD",
                    message: "PAssword is wrong"
                })
            } else {
                updateSetNewLastname(lastname, user_id)
                return res.json({
                    success: true,
                    message: "All is good"
        
                })
            }
        })
    } else {
        return res.json({
            success: false
        })
    }
}

module.exports = editLastname