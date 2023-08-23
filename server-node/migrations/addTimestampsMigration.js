const mongoose = require('mongoose');
const Post = require('../models/posts.model');

mongoose.connect('mongodb://127.0.0.1:27017/bookplatform_db', { useNewUrlParser: true, useUnifiedTopology: true });

async function updateExistingDocuments() {
    try {
        await Post.updateMany({}, { $set: { createdAt: new Date(), updatedAt: new Date() } });
        console.log('Documents updated successfully.');
    } catch (error) {
        console.error('Error updating documents:', error);
    } finally {
        mongoose.disconnect();
    }
}

updateExistingDocuments();
