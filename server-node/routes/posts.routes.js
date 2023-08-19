const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts.controller")
// const authMiddleware = require("../middlewares/auth.middleware");


router.post("/create_post", postsController.createPost)
router.post("/update_post", postsController.updatePost)
router.post("/delete_post", postsController.deletePost)
router.get("/get_all_posts", postsController.getAllPosts)
router.get("/get_followed_posts", postsController.getFollowedPosts)
router.post("/follow_user", postsController.followUser)
router.post("/unfollow_user", postsController.unFollowUser)
router.post("/like_post", postsController.likePost)
router.post("/unlike_post", postsController.unLikePost)

module.exports = router;
