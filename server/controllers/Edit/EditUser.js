const editUser = (req, res) => {
    if(req.params.slug === 'bio'){
        console.log(req.body.bio)
        return res.json("ok")
    }
}

module.exports = editUser