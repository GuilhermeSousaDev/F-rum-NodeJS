const jwt = require('jsonwebtoken')

module.exports = {
    createToken: (data) => jwt.sign(data, global.SECRET, { expiresIn: '2d' }),

    decoded: token => {
        const data = jwt.verify(token, global.SECRET)
        return data
    },

    authorize: (req,res,next) => {
        const token = req.cookies.token
        if(!token) {
            res.redirect('/user/register')
        }else {
            jwt.verify(token, global.SECRET, (err, decoded) => {
              if(err) {
                res.redirect('/user/login')
              }else {
                next()
              }
            })

        }
    }
}
