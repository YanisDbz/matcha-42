const jwt = require("jsonwebtoken")
const {setUserPos} = require("../utils/utils")

const userSendPos =  (req, res) => {
    const jwt_token = req.cookies.login

    if(jwt_token){
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        const  {latitude, longitude} =  req.body
        if(setUserPos(user_id, latitude, longitude)) {
            return res.json({
                success: true,
                latitude: latitude,
                longitude: longitude,
                user_id: user_id
            })
        }
     } else {
        return res.json({
            success: false,
            error: "USER_NOT_LOGGED"
        })
    }
}

module.exports = userSendPos