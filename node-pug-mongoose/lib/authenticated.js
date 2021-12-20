let authenticated = (req, res, next) => {
    if(!req.isAuthenticated()) {
        res.redirect('/')
    }
    next()
}

module.exports = authenticated