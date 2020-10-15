const editBio = require("./Bio/Bio")
const editUserImg = require("./UserImg/userImg")


const editUser = (req, res) => {
    if(req.params.slug === 'bio'){
        editBio(req, res)
    } else if (req.params.slug === 'userimg') {
        editUserImg(req, res)
    }
}

module.exports = editUser