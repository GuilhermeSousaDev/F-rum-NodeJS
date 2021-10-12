module.exports = {
    isAuth: (req,res,next) => {
        if(req.isAuthenticated() && req.user) {
            return next()
        }else {
            res.redirect('/user/login')
            req.flash("error", "Você precisa estar logado para acessar esta página")
        }
    }
}