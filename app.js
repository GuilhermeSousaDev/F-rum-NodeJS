const express = require('./config/customexpress')
const app = express()

const { mongoURI } = require('./config/config')
const mongoose = require('mongoose')
mongoose.connect(mongoURI)

require('./models/User')
const User = mongoose.model('User')

const PostRoute = require('./routes/posts')
const DiscussionRoute = require('./routes/discussions')
const UserRoute = require('./routes/user')

app.get('/', (req,res) => {
    User.find().lean().then(doc => {
        res.render('index', { doc })
    })
})
app.use('/posts', PostRoute)
app.use('/discussions', DiscussionRoute)
app.use('/user', UserRoute)

const port = process.env.PORT || 8081
app.listen(port, () => console.log("Servidor iniciado na porta " + port))