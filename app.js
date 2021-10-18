const express = require('./config/customexpress')
const app = express()

const { mongoURI } = require('./config/config')
const mongoose = require('mongoose')
mongoose.connect(mongoURI)

require('./models/User')
const User = mongoose.model('User')
const { decoded, createToken, authorize } = require('./services/auth')

const PostRoute = require('./routes/posts')
const DiscussionRoute = require('./routes/discussions')
const UserRoute = require('./routes/user')

app.get('/', authorize, async (req,res) => {
    try {
      const token = await decoded(req.cookies.token)
      const doc = await User.findOne({ _id: token._id }).lean()

      const newToken = await createToken({ _id: doc._id, name: doc.nome })
      res.cookie('token', newToken)
      res.render('index')
    } catch (e) {
      console.log(e)
    }
})
app.use('/posts', PostRoute)
app.use('/discussions', DiscussionRoute)
app.use('/user', UserRoute)

const port = process.env.PORT || 8081
app.listen(port, () => console.log("Servidor iniciado na porta " + port))
