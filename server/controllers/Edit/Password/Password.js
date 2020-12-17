const jwt = require("jsonwebtoken")
const {isEmpty} = require("../../../utils/FormValidate")
const {CheckPassword, updateSetEditNewPassword} = require("../../../utils/utils")

const editPassword = (req, res) => {
    const jwt_token = req.cookies.login
    if(jwt_token){
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        const {newpassword, confirmpwd, password} = req.body
        if(isEmpty(newpassword)){
            return res.json({
                success: false,
                error: "NEWPASSWORD_EMPTY_FIELD",
                message: "New Password is required",
            })
        }
        if(isEmpty(confirmpwd)){
            return res.json({
                success: false,
                error: "CONFIRMPWD_EMPTY_FIELD",
                message: "Confirm password is required",
            })
        }
        if(newpassword !== confirmpwd){
            return res.json({
                success: false,
                error: "PASSWORD_DO_NOT_MATCH",
                message: "Password do not match",
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
                updateSetEditNewPassword(newpassword, user_id)
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

module.exports = editPassword