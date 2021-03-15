const jwt = require("jsonwebtoken")
const {getUserData, checkLike, checkBlock, checkMatch} = require("../utils/utils")

const userData = async (req, res) => {
  const  jwt_token  = req.cookies.login
  if(jwt_token){
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
    const user_id = decode.id
    const {profile} = req.body
    const result = await getUserData(profile)
    const like = await checkLike(user_id, profile)
    const block = await checkBlock(user_id, profile)
    const imblocked = await checkBlock(profile, user_id)
    const imliked = await checkLike(profile, user_id)
     if(result){
        return res.json({
            success: true,
            results: result,
            like: like.length,
            block: block.length,
            imblocked: imblocked.length,
            imliked: imliked.length,
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

module.exports = userData