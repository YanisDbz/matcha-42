const editBio = require("./Bio/Bio")
const editUserImg = require("./UserImg/userImg")
const editProfilImg = require("./ImgProfil/Imgprofil")
const editGender = require("./Gender/Gender")
const editOrientation = require("./Orientation/Orientation")
const editEmail = require("./Email/Email")
const editLastname = require("./Lastname/Lastname")
const editFirstname = require("./Firstname/Firstname")
const editPassword = require("./Password/Password")

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
    } else if (req.params.slug === 'email') {
        editEmail(req, res)
    } else if (req.params.slug === 'lastname') {
        editLastname(req, res)
    } else if (req.params.slug === 'firstname') {
        editFirstname(req, res)
    } else if (req.params.slug === 'password') {
        editPassword(req, res)
    }
}

module.exports = editUser