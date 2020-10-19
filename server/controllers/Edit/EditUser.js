const editBio = require("./Bio/Bio")
const editUserImg = require("./UserImg/userImg")
const editProfilImg = require("./ImgProfil/Imgprofil")
const editGender = require("./Gender/Gender")
const editOrientation = require("./Orientation/Orientation")

const editUser = (req, res) => {
    if(req.params.slug === 'bio'){
        editBio(req, res)
    } else if (req.params.slug === 'userimg') {
        editUserImg(req, res)
    } else if (req.params.slug === 'imgprofil') {
        editProfilImg(req, res)
    } else if (req.params.slug === 'gender') {
        editGender(req, res)
    } else if (req.params.slug === 'orientation') {
        editOrientation(req, res)
    }
}

module.exports = editUser