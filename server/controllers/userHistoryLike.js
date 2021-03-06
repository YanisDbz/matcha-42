const jwt = require("jsonwebtoken")
const {getHistoryLike} = require("../utils/utils")

const getUserHistoryLike = async (req, res) => {
  const  jwt_token  = req.cookies.login
  if(jwt_token){
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
    const user_id = decode.id
    const result = await getHistoryLike(user_id)
     if(result){
        return res.json({
            success: true,
            results: result,
        })
    }
  } else {
    return res.json({
      success: false,
      error: "USER_NOT_LOGGED",
      message: "User not logged"
    })
  }
}

module.exports = getUserHistoryLike