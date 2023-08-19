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
    }
}, {
    timestamps: true
})