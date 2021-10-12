const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

require('../models/User')
const User = mongoose.model('User')

module.exports = passport => {
    passport.use(new localStrategy({ 
        usernameField: 'email', 
        passwordField: 'password' 
    }, (email,password,done) => {
        User.findOne({ email }).then(doc => {
            if(!doc) {
                return done(null, false, { message: "Esse Usuário não existe"})
            }
            bcrypt.compare(password, doc.password, (err, equals) => {
                if(equals) {
                    return done(null, doc)
                }else {
                    return done(null, false, { message: "Senha Incorreta"})
                }
            })
        })
    }))

    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}