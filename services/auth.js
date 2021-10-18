const jwt = require('jsonwebtoken')

module.exports = {
    createToken: async (data) => jwt.sign(data, global.SECRET, { expiresIn: '1d' }),

    decoded: async token => {
        const data = await jwt.verify(token, global.SECRET)
        return data
    },

    authorize: (req,res,next) => {
        const token = req.cookies.token
        if(!token) {
            res.redirect('/user/login')
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
