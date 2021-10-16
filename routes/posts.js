const express = require('express')
const router = express.Router()

const controller = require('../controllers/Posts-controller')

router.get('/', controller.main)
router.get('/new', controller.new)
router.get('/:id', controller.postForId)

router.post('/new', controller.newPost)

module.exports = router