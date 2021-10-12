const mongoose = require('mongoose')

require('../models/Posts')
const Posts = mongoose.model('Post')

module.exports = {
    main: (req,res) => {
        Posts.find().then(doc => {
            res.render('discussion-view/index', { doc })
        }).catch(e => console.log(e))
    },
    postForId: (req,res) => {
        const { id } = req.params
        Posts.findOne({ _id: id }).then(doc => {
            res.render('discussion-view/uniquepost', { doc })
        }).catch(() => res.redirect('/'))
    },
    new: (req,res) => {
        res.render('post-view/index', {
            css: 'new.css',
            js: 'new.js'
        })
    },
    newPost: (req,res) => {
        const { title, text } = req.body
        if(req.files) {
            const file = req.files.image
            const filename = file.name
            file.mv('public/image/' + filename, err => {
                if(err) {
                    console.log(err)
                    res.redirect('/posts')
                    req.flash("error", "Erro ao subir imagem")
                }else {
                    Posts.create({ title, text, image: filename }).then(doc => {
                        res.redirect('/posts')
                        req.flash("success", "Post com id " + doc._id + "criado com sucesso")
                    })
                }
            })
        }
    }
}