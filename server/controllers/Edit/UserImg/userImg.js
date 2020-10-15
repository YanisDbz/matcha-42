const jwt = require("jsonwebtoken")
const storeFile = require("../../../utils/storeFile")
const {setUserImg} = require("../../../utils/utils.js")


const editUserImage = (req, res) => {
    const  jwt_token  = req.cookies.login
    
    if(jwt_token){
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        const  { imageId } = req.body
        const imgname = storeFile(user_id, req.files.image)
        if(imgname && imageId){
            setUserImg(user_id, imageId, `/img/${user_id}/${imgname}`)
            return res.json({
                success: true,
                message: "Image Added",
            })
        } else {
            return res.json({
                success: false,
                error: "EXT IMG NOT GOOD",
                message: "Please make sure your img is type of png or jpg"
            })
        }
    } else {
        return res.json({
            sucess: false,
            message: "Not Ok"
        })
    }
}

module.exports = editUserImage