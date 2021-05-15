const jwt = require("jsonwebtoken")
const {setMatchLike, setNotif, checkMatch} = require("../utils/utils")

const matchLike = async (req, res) => {
    const jwt_token = req.cookies.login;

    if(jwt_token){
        const {match_id} = req.body;
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        const result = setMatchLike(user_id, match_id)
        const check = await checkMatch(user_id, match_id)
        if(result){
            if(check){
                setNotif(user_id, match_id, "match")
                setNotif(match_id, user_id, "match")
            }
            setNotif(user_id, match_id, "like")
            return res.json({
                success: true,
                message: "User liked"
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

module.exports = matchLike