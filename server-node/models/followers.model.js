const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    followerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    followingId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
});

const model = mongoose.model('Follower', followerSchema);

module.exports = model;