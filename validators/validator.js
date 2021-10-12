const mongoose = require('mongoose')
require('../models/User')
const User = mongoose.model('User')

let erros = []

class Validator {
    erros = []

    emailExists = (field, message) => {
        User.find({ email: field }).lean().then(doc => {
            if(doc) {
                erros.push({ message: message })
            }
        })
    }
    fieldEmpty = (field, message) => {
        if(!field || field.length == 0) {
            erros.push({ message: message })
        }
    }
    hasMaxLen = (field, max, message) => {
        if(!field || field.length > max) {
            erros.push({ message: message })
        }
    }
    hasMinLen = (field, min, message) => {
        if(!field || field.length < min) {
            erros.push({ message: message })
        }
    }
    isEmail = (field, message) => {
        let reg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i
        if(!reg.test(field)) {
            erros.push({ message: message })
        }
    }

    erros = () => erros

    isValid = () => erros.length == 0
}

module.exports = Validator