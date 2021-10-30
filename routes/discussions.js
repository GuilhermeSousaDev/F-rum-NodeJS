const express = require('express')
const router = express.Router()

const controller = require('../controllers/Discussion-controller')
const { authorize } = require('../services/auth')

router.get('/', controller.main)
router.get('/new', authorize, controller.new)
router.get('/:id', controller.mainWithId)
router.get('/:id/insertUser', authorize, controller.InsertUser)
router.get('/:id/posts', controller.DisPosts)
router.get('/delete/:id', controller.deleteDis)

router.post('/new', controller.newPost)


module.exports = router
