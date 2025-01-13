const { Router } = require("express");
const{ getAllPosts, createPost, getPostById, updatePost, deletePost } = require("../../controllers/post.controller")
const { auth } = require("../../utils/middlewares/auth")

const postsRouter = Router();

postsRouter.route("/").get(getAllPosts).post(auth, createPost)
postsRouter.use(auth)
postsRouter.route("/:id").get(getPostById).put(updatePost).delete(deletePost)

module.exports = { postsRouter };  // Ensure this is correct
