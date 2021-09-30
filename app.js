const express = require('./config/customexpress')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/forum').then(() => {
    console.log("Conectado com sucesso")
}).catch(e => {
    console.log(e)
})

app.get('/', (req,res) => {
    res.send("Hello World")
    req.flash("error", "Hello")
})

const port = process.env.PORT || 8081
app.listen(port, () => console.log("Servidor iniciado na porta " + port))