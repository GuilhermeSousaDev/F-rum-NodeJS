const jwt = require('jsonwebtoken')

module.exports = {
    createToken: (data) => jwt.sign(data, global.SECRET, { expiresIn: '1d' }),

    decoded: token => {
        jwt.verify(token, global.SALT_KEY, (err, decoded) => {
            if(err) {
                console.log(err)
            }else {
                return decoded
            }
        })
    },

    authorize: (req,res,next) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token
        if(!token) {
            res.redirect('/user/login')
        }else {
            next()
        }
    }
}