const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    bookName: { 
        type: String, 
        required: true 
    },
    author: 
    { type: String, 
        required: true 
    },
    picture: String,
    review: String,
    likesCount: { 
        type: Number, 
        default: 0 
    },
    postedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true 
    }
},  {
    timestamps: true
});

const model= mongoose.model('Post', postSchema);

module.exports = model;
