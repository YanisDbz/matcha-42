const path = require('path')

const SendFile = (user_id, image) => {
    const today = new Date()
    const extimg = path.extname(image.name)
    const imgname = today.getTime() + user_id + extimg

    if(extimg !== ".png" && extimg !== ".jpg"){
        return false
    }
    image.mv(`../client/public/img/${user_id}/${imgname}`, err => {
        if(err) {
            return err
        }
    })
    return imgname
}

module.exports = SendFile