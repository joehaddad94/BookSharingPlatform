const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts.controller")
// const authMiddleware = require("../middlewares/auth.middleware");


router.post("/create_post", postsController.createPost)
router.post("/update_post/:id", postsController.updatePost)
router.delete("/delete_post/:id", postsController.deletePost)
router.get("/get_all_posts", postsController.getAllPosts)
router.get("/get_my_posts", postsController.getMyPosts)
router.get("/get_followed_posts", postsController.getFollowedPosts)
router.post("/follow_user", postsController.followUser)
router.post("/unfollow_user", postsController.unFollowUser)
router.post("/toggle_like", postsController.toggleLikePost)


module.exports = router;
