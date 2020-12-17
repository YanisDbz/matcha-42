const jwt = require("jsonwebtoken")
const {isEmpty, isEmail} = require("../../../utils/FormValidate")
const {CheckPassword, updateSetNewEmail} = require("../../../utils/utils")

const editEmail = (req, res) => {
    const jwt_token = req.cookies.login
    if(jwt_token){
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        const {email, password} = req.body
        if(isEmpty(email)){
            return res.json({
                success: false,
                error: "EMAIL_EMPTY_FIELD",
                message: "Email is required",
            })
        }
        if(!isEmail(email)){
            return res.json({
                success: false,
                error: "EMAIL_WRONG_FORMAT",
                message: "Email wrong format"
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
                updateSetNewEmail(email, user_id)
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

module.exports = editEmail