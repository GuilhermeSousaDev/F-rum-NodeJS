const mongoose = require('mongoose')
const formidable =  require('formidable')
const fs = require('fs')

require('../models/Discussions')
const Discussion = mongoose.model('Discussions')

module.exports = {
    main: (req,res) => {
        res.render('discussion-view/index', {
            css: 'discussion.css',
            js: 'discussion.js'
        })
    },
    new: (req,res) => {
        res.render('discussion-view/new', { css: 'new.css', js: 'new.js' })
    },
    newPost: (req,res) => {
        const form = new formidable.IncomingForm()
        form.parse(req, (err, fields, file) => {
            const oldpath = file.filetoupload.path
            const newpath = '../public/image/' + file.filetoupload.
            fs.rename(oldpath, newpath, (err) => {
                if(err) {
                    console.log(err)
                }else {
                    const { title,description } = req.body
                    Discussion.create({ title, description, image: file.filetoupload.name }).then(() => {
                        console.log("Discussion Criada com sucesso")
                        res.redirect('/')
                    }).catch(e => {
                        console.log(e)
                    })
                }
            })
        })
    }
}