const express =  require('express')
const router = express.Router()

const controller = require('../controllers/User-controller')

router.get('/login', controller.login)
router.post('/loginAuth', controller.loginAuth)

router.get('/register', controller.register)
router.post('/register', controller.registerCreate)

module.exports = router