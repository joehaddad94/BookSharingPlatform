const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likes: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {
    timestamps: true
})

const model = mongoose.model("User", usersSchema);
module.exports = model;