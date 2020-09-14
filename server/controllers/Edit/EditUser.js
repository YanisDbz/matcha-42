const editBio = require("./Bio/Bio")

const editUser = (req, res) => {
    if(req.params.slug === 'bio'){
        editBio(req, res)
    }
}

module.exports = editUser