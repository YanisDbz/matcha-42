const jwt = require("jsonwebtoken")
const {checkLike} = require("../utils/utils")

const checkMatchLike = async (req, res) => {
    const jwt_token = req.cookies.login;

    if(jwt_token){
        const {match_id} = req.body;
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        const result = await checkLike(user_id, match_id)
        if(result){
            return res.json({
                success: true,
                results: result.length
            })
        }
    } else {
        return res.json({
            success: false,
            error: "USER_NOT_LOGGED"
        })
    }
}
module.exports = checkMatchLike