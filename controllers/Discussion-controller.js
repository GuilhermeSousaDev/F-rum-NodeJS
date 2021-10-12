const mongoose = require('mongoose')

require('../models/Discussions')
const Discussion = mongoose.model('Discussions')
require('../models/UsersInsertedDis')
const InsertUser = mongoose.model('UserInserted')
require('../models/Posts')
const Posts = mongoose.model('Post')

module.exports = {
    main: (req,res) => {
        Discussion.find().lean().then(doc => {
            res.render('discussion-view/index', {
                doc,
                css: 'discussion.css',
                js: 'discussion.js'
            })
        }).catch(e => console.log(e))
    },
    mainWithId: (req,res) => {
        const { id } = req.params
        Discussion.findOne({ _id: id }).lean().then(doc => {
            res.render('discussion-view/discussion', { doc })
        }).catch(e => console.log(err))
    },
    InsertUserDis: (req,res) => {
        const { id } =  req.params
        InsertUser.create({ discussion_id: id, user_id: req.user._id }).then(doc => {
            res.redirect('/discussions/' + id + '/post')
        }).catch(e => console.log(e))
    },
    DisPosts: (req,res) => {
        const { id } = req.params
        Posts.find({ discussion: id }).lean().then(doc => {
            res.render('discussion-view/posts', { doc })
        }).catch(e => console.log(e))
    },
    new: (req,res) => {
            res.render('discussion-view/new', {
                css: 'new.css'
            })
    },
    newPost: (req,res) => {  
        if(req.files) {
            const file = req.files.image
            const filename = file.name
            file.mv('public/image/' + filename, err => {
                if(err) {
                    console.log(err)
                    req.flash("error", "Erro ao fazer upload da imagem")
                }else {
                    const { title, description } = req.body
                    Discussion.create({ title, description, image: filename }).then(doc => {
                        req.flash("success", "Discussão com id " + doc._id + " criada com sucesso")
                        res.redirect('/discussions')
                    }).catch(e => console.log(e))
                }
            })
        }
    },
    deleteDis: (req,res) => {
        const { id } = req.params
        if(id) {
            Discussion.findByIdAndDelete(id, (err, doc) => {
                if(err) {
                    req.flash("error", "Erro ao deletar discussão")
                    res.redirect('/discussions')
                }else {
                    res.redirect('/discussions')
                    req.flash("success", `Discussão com id ${doc._id} deltada com sucesso`)
                }
            })
        }

    }
}