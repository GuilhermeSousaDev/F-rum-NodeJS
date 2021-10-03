const mongoose = require('mongoose')

require('../models/Posts')
const Posts = mongoose.model('Post')

module.exports = {
    main: (req,res) => {
        res.render('post-view/index', {
            css: 'posts.css',
            js: 'posts.js'
        })
    },
    new: (req,res) => {
        res.send("Nova Postagem")
    }
}