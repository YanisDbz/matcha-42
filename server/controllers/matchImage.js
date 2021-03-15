const jwt = require("jsonwebtoken")
const {getUserImage} = require("../utils/utils")

const matchImage =  async (req, res) => {
    const jwt_token = req.cookies.login;

    if(jwt_token){
        const {match_id} = req.body;
        const result = await getUserImage(match_id)
        if(result){
            return res.json({
                success: true,
                images: result
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

module.exports = matchImage