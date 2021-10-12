const passport = require('passport')
const bcrypt = require('bcryptjs')
const Validate = require('../validators/validator')

const mongoose = require('mongoose')
require('../models/User')
const User = mongoose.model('User')

module.exports = {
    login: (req,res) => { 
        res.render('users/login')
    },
    loginAuth: (req,res,next) => {
        passport.authenticate("local", {
            successRedirect: "/discussions",
            failureRedirect: "/user/login",
            failureFlash: true
        })(req,res,next)
    },
    register: (req,res) => {
        res.render('users/register')
    },
    registerCreate: (req,res) => {
        const { nome, email, password } = req.body
        const contract = new Validate()
        contract.emailExists(email, "Este email já existe")
        contract.fieldEmpty(nome, "Preencha seu nome")
        contract.fieldEmpty(email, "Preencha seu email")
        contract.fieldEmpty(password, "Preencha sua senha")
        contract.isEmail(email, "Email Inválido")
        contract.hasMaxLen(nome, 40, "Nome muito grande")
        contract.hasMinLen(password, 3, "Senha muito curta")

        if(!contract.isValid()) {
            res.render('users/register', { erros: contract.erros })
            return;
        }

        const user = new User({ nome, email, password })
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) {
                    req.flash("error", "Erro ao encriptar senha")
                    return
                }
                user.password = hash
                user.save().then(doc => {
                    req.flash("success", "Usuário criado com sucesso")
                    res.redirect('/user/login')
                }).catch(e => console.log(e))
            })
        })
    }
}