const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

module.exports = () => {
    const app = express()

    app.use(flash())
    app.use(session({
        name: 'BAPSSESSION',
        secret: 'BAPSISGREAT',
        secure: true,
        resave: true,
        saveUninitialized: true,
        cookie: {
          maxAge: 365 * 24 * 60 * 60 * 1000
        }
      }));
    app.use((req,res,next) => {
        res.locals.error = req.flash("error")
        res.locals.success = req.flash("success")
        res.locals.err = req.flash("err")
        res.locals.user = req.user || null
        next()
    })
    
    app.use('handlebars', handlebars({defaultLayout: 'main'}))
    app.engine('handlebars', handlebars())
    app.set('view engine', 'handlebars')

    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    app.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }));

    app.use(cookieParser())
    app.use(express.static('public'))
    return app
}