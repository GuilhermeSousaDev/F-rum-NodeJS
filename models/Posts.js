const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const Post = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    discussion: {
        type: Schema.Types.ObjectId,
        ref: "Discussions",
        required: true
    },
    image: {
        type: String,
        default: "../public/image/imagedefault.png"
    },
    author: {
        type: Schema.Types.String,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("Post", Post)