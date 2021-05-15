const jwt = require("jsonwebtoken")
const {getTotalNotif, getNotifData, setNotifRead} = require("../utils/utils")

const notifUser = async (req, res) => {
    const jwt_token = req.cookies.login;

    if(jwt_token){
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        const result = await getTotalNotif(user_id)
        const notif_result = await getNotifData(user_id)
        if(result){
            return res.json({
                success: true,
                total: result.length,
                notif: notif_result
            })
        }
    } else {
        return res.json({
            success: false,
            error: "USER_NOT_LOGGED"
        })
    }
}

const notifUserRead = (req, res) => {
    const jwt_token = req.cookies.login

    if(jwt_token){
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        const result = setNotifRead(user_id)
        if(result){
            return res.json({
                success: true
            })
        }
    } else {
        return res.json({
            success: false,
            error: "USER_NOT_LOGGED"
        })
    }
}
module.exports = {notifUser, notifUserRead}