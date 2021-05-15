const jwt = require("jsonwebtoken")
const {getUserMatchData, getMatchMessage} = require("../utils/utils")

const chatContact = async (req, res) => {
    const jwt_token = req.cookies.login;

    if(jwt_token){
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        const result = await getUserMatchData(user_id)
        if(result && result.length > 0) {
            return res.json({
                success: true,
                matchList: result
            })
        }
    } else {
        return res.json({
            success: false,
            error: "USER_NOT_LOGGED"
        })
    }
}

const chatMessage = async (req, res) => {
    const jwt_token = req.cookies.login;

    if(jwt_token){
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        const {user_chat} = req.body
        const result = await getMatchMessage(user_id, user_chat)
        if(result){
            return res.json({
                success: true,
                messages: result
            })
        }
    } else {
        return res.json({
            success: false,
            error: "USER_NOT_LOGGED"
        })
    }
}
module.exports = {chatContact, chatMessage}