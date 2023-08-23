const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts.controller")
// const authMiddleware = require("../middlewares/auth.middleware");


router.post("/create_post", postsController.createPost)
router.post("/update_post", postsController.updatePost)
router.post("/delete_post", postsController.deletePost)
router.get("/get_all_posts", postsController.getAllPosts)
router.get("/get_my_posts", postsController.getMyPosts)
router.get("/get_followed_posts", postsController.getFollowedPosts)
router.post("/follow_user", postsController.followUser)
router.post("/unfollow_user", postsController.unFollowUser)
router.post("/like_post", postsController.likePost)
router.post("/dislike_post", postsController.disLikePost)

module.exports = router;
