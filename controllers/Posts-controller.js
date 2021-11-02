const mongoose = require('mongoose')
const { decoded } = require('../services/auth')

require('../models/Posts')
const Posts = mongoose.model('Post')
require('../models/User')
const User = mongoose.model('User')

module.exports = {
    main: (req,res) => {
        Posts.find().populate('author').lean().then(doc => {
            res.render('post-view/index', { doc, user: req.cookies.token })
        }).catch(e => console.log(e))
    },
    postForId: (req,res) => {
        const { id } = req.params
        Posts.findOne({ _id: id }).then(doc => {
            res.render('discussion-view/uniquepost', { doc, user: req.cookies.token })
        }).catch(() => res.redirect('/'))
    },
    new: (req,res) => {
        res.render('post-view/new', {
            css: 'new.css',
            js: 'new.js',
            user: req.cookies.token,
            id: req.params.id
        })
    },
    newPost: (req,res) => {
        const { title, text, id } = req.body
        if(req.files) {
            const file = req.files.image
            const filename = file.name
            file.mv('public/image/' + filename, err => {
                if(err) {
                    console.log(err)
                    res.redirect('/posts')
                    req.flash("error", "Erro ao subir imagem")
                }else {
                    const token = decoded(req.cookies.token)
                    Posts.create({ title, text, discussion: id, author: token._id, image: filename }).then(doc => {
                        res.redirect('/posts')
                        req.flash("success", "Post com id " + doc._id + "criado com sucesso")
                    })
                }
            })
        }
    }
}
