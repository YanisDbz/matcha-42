const jwt = require("jsonwebtoken")
const {setMatchUnlike} = require("../utils/utils")

const matchUnlike = (req, res) => {
    const jwt_token = req.cookies.login;

    if(jwt_token){
        const {match_id} = req.body;
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        const result = setMatchUnlike(user_id, match_id)
        if(result){
            return res.json({
                success: true,
                message: "User Unliked"
            })
        } else {
            return res.json({
                success: false,
                error: "SQL INTERNAL SERVER ERROR"
            })
        }
    } else {
        return res.json({
            success: false,
            error: "USER_NOT_LOGGED"
        })
    }
}

module.exports = matchUnlike