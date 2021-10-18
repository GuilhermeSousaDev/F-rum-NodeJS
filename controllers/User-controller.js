const bcrypt = require('bcryptjs')
const Validate = require('../validators/validator')
const Auth = require('../services/auth')

const mongoose = require('mongoose')
require('../models/User')
const User = mongoose.model('User')

module.exports = {
    login: (req,res) => {
        res.render('users/login')
    },
    loginAuth: (req,res) => {
        const { nome, email, password } = req.body
        User.findOne({ nome, email }).lean().then(doc => {
            if(!doc) {
                req.flash("error", "Usuário não existe")
                res.redirect('/user/login')
            }else {
                User.findOne({ nome, email, password }).lean().then(doc => {
                    if(!doc) {
                        req.flash("error", "Senha Incorreta")
                        res.redirect('/user/login')
                    }else {
                        const { _id } = doc
                        const token = Auth.createToken({ _id })
                        res.cookie('token', token)
                        res.redirect('/discussions')
                    }
                })
            }
        })
    },
    register: (req,res) => {
        res.render('users/register')
    },
    registerCreate: async (req,res) => {
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
                user.save().then(() => {
                    req.flash("success", "Usuário criado com sucesso")
                    res.redirect('/user/login')
                }).catch(e => console.log(e))
            })
        })
    }
}
