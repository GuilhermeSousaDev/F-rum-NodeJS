const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const Discussions = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Sem descrição"
    },
    image: {
        type: String,
        default: "public/image/imageD.png"
    },
    moderator: {
        type: Schema.Types.String,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("Discussions", Discussions)