const jwt = require("jsonwebtoken")
const {isEmpty} = require("../../../utils/FormValidate")
const {CheckPassword, updateSetNewFirstname} = require("../../../utils/utils")

const editFirstname = (req, res) => {
    const jwt_token = req.cookies.login
    if(jwt_token){
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        const {firstname, password} = req.body
        if(isEmpty(firstname)){
            return res.json({
                success: false,
                error: "FIRSTNAME_EMPTY_FIELD",
                message: "Firstname is required",
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
                updateSetNewFirstname(firstname, user_id)
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

module.exports = editFirstname