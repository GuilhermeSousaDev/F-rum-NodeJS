const mongoose = require('mongoose')
const  { decoded } = require('../services/auth')

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
                js: 'discussion.js',
                user: req.cookies.token
            })
        }).catch(e => console.log(e))
    },
    mainWithId: (req,res) => {
        const { id } = req.params
        const token = decoded(req.cookies.token)
        Discussion.findOne({ _id: id }).lean().then(docs => {
            InsertUser.findOne({ user_id: token._id, discussion_id: id })
              .lean()
              .then(doc => {
                if(doc) {
                  res.render('discussion-view/discussion', { exists: true, docs })
                }else {
                  res.render('discussion-view/discussion', { exists: false, docs })
                }
              }).catch(e => console.log(e))
        }).catch(e => console.log(err))
    },
    InsertUser: (req,res) => {
        const token = decoded(req.cookies.token)
        const { id } =  req.params
        InsertUser.create({ discussion_id: id, user_id: token._id  }).then(() => {
              res.redirect('/discussions/' + id + '/posts')
          }).catch(e => console.log(e))
    },
    DisPosts: async (req,res) => {
      const { id } = req.params
      try {
        const doc = await Posts.find({ discussion: id }).lean()
        if(doc) {
          res.render('post-view/index', { doc })
        }else {
          res.render('post-view/index', {
            message: 'Esta Discussão não tem Postagens, Seja o Primeiro a postar',
            discussion_id: id
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    new: (req,res) => {
            res.render('discussion-view/new', {
                css: 'new.css',
                user: req.cookies.token
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
