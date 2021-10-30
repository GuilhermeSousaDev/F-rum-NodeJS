const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const UserInserted = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    discussion_id: {
        type: Schema.Types.ObjectId,
        ref: "Discussions",
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("UserInserted", UserInserted)
