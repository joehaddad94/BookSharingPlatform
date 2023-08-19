const Post = require("../models/posts.model")

const createPost = async (req, res) => {
    try {
        const { bookName, author, picture, review } = req.body;
        
        const postedBy = req.user._id;
        const newPost = new Post({
            bookName,
            author,
            picture,
            review,
            postedBy
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { createPost }