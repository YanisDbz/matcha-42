const connection = require("../config/db")
const jwt = require("jsonwebtoken")
const fs = require('fs')
const deleteUserImage = (req, res) => {
    const jwt_token = req.cookies.login

    if(jwt_token){
        const { imageId, imageName } = req.body
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        connection.query(`UPDATE user_image SET ${imageId} = ? WHERE user_id = ?`, 
        [null, user_id], (error, results) => {
            if(error){
                return res.json({
                    success: false,
                    message: "Error from our server"
                })
            } else {
                fs.unlink(`../client/public${imageName}`, (err) => {
                    if(err){
                        console.error(err)
                        return
                    } else {
                        console.log("image deleted");
                    }
                })
                return res.json({
                    success: true,
                    message: "Image Successfully deleted"
                 })
            }
        })
    } else {
        return res.json({
            success: false,
            error: "USER_NOT_LOGGED",
            messqge: "Please log first"
        })
    }
}

module.exports = deleteUserImage