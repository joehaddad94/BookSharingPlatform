const Post = require("../models/posts.model");
const Follower = require("../models/followers.model");
const User = require("../models/users.model");

const createPost = async (req, res) => {
    try {
        const { bookName, author, picture, review } = req.body;

        if (!bookName || !author) {
            return res.status(400).json({ message: "Book name and author are required fields." });
        }
        
        const postedBy = req.user.id;
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

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { bookName, author, picture, review } = req.body;
       
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        post.bookName = bookName || post.bookName;
        post.author = author || post.author;
        post.picture = picture || post.picture;
        post.review = review || post.review;

        await post.save();

        res.json(post);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
 
        await post.remove();

        res.json({ message: "Post deleted successfully." });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllPosts = async ( req, res ) => {
    try {
        const posts = await Post.find().populate("postedBy", "firstName lastName likes");

        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getFollowedPosts = async (req, res) => {
    try {
        const followers = await Follower.find({ followerId: req.user.id });

        const followingIds = followers.map(follower => follower.followingId);
        
        const followedPosts = await Post.find({ postedBy: { $in: followingIds } }).populate("postedBy", "firstName lastName");

        res.json(followedPosts);
    } catch (error) {
        console.error("Error fetching followed posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const followUser = async (req, res) => {
    try {
        console.log("req.body: ",req.body);
        const { userIdToFollow } = req.body;

        const existingFollower = await Follower.findOne({
            followerId: req.user.id,
            followingId: userIdToFollow
        });
        console.log(existingFollower)
        if (existingFollower) {
            return res.status(400).json({ message: "User is already being followed" });
        }
        
        const follower = new Follower({
            followerId: req.user.id,
            followingId: userIdToFollow
        });
        
        await follower.save();

        const savedFollower = await follower.save();

        res.status(201).json({ 
            message: "User followed successfully",
            follower: savedFollower
         });
    } catch (error) {
        console.error("Error following user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const unFollowUser = async (req, res) => {
    try {
        const { userIdToUnfollow } = req.body;

        const userToUnfollow = await User.findById(userIdToUnfollow);
        if (!userToUnfollow) {
            return res.status(404).json({ message: "No user to unfollow" });
        }

        await Follower.findOneAndDelete({
            followerId: req.user.id,
            followingId: userIdToUnfollow
        });

        res.json({ message: "User unfollowed successfully" });
    } catch (error) {
        console.error("Error unfollowing user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const likePost = async (req, res) => {
    try {
        const { postId } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (user.likes.includes(postId)) {
            return res.json({ message: "Post already liked by this user" });
        }

        if (!user.likes.includes(postId)) {
            user.likes.push(postId);
            post.likesCount++;
            await user.save();
            await post.save();
        }

        const updatedPost = await Post.findById(postId);

        res.json({ 
            message: "Post liked successfully",
            updatedPost: updatedPost
        });
    } catch (error) {
        console.error("Error liking Post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const disLikePost = async (req, res) => {
    try {
        const { postId } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (user.likes.includes(postId)) {
            user.likes.pull(postId);
            post.likesCount--;
            await user.save();
            await post.save();
        } else {
            return res.json({ message: "Post is not liked by this user" });
        }

        const updatedPost = await Post.findById(postId);

        res.json({ 
            message: "Post disliked successfully",
            updatedPost: updatedPost
        });
    } catch (error) {
        console.error("Error disliking Post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { 
    createPost, 
    updatePost, 
    deletePost, 
    getAllPosts, 
    getFollowedPosts, 
    followUser, 
    unFollowUser,
    likePost,
    disLikePost }