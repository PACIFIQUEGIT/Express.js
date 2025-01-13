const { getAllPosts, getPostById, updatePost, createPost, deletePost } = require("../services/post/post.service")
const { catchAsync } = require("../utils/catchAsync")

exports.createPost = catchAsync(async (req, res) => {
    const { title, content, images } = req.body
    if (!title || !content) {
        return res.status(400).json({message: "Title and Content are required"})
    }
    console.log("req.user", req.user)
    const author = req.user.id
    console.log("Author", author)
    const postData = { title, content, images, author }
    const post = await createPost(postData)
    res.status(201).json(post)
})

exports.getAllPosts = catchAsync(async(req, res) => {
    const posts = await getAllPosts()
    res.status(200).json(posts)
})

exports.getPostById = catchAsync(async(req, res) => {
    if(!req.params.id) {
        return res.status(400).json({message: "Post Id is required"})
    }
    const post = await getPostById(req.params.id)
    res.status(200).json(post)
})

exports.updatePost = catchAsync(async(req, res) => {
    if(!req.params.id) {
        return res.status(400).json({message: "Post Id is required"})
    }
    const updatedPost = await updatePost(req.params.id, req.body)
    res.status(200).json(updatedPost)
})

exports.deletePost = catchAsync(async(req, res) => {
    if(!req.params.id) {
        return res.status(400).json({message: "Post Id is required"})
    }
    const userId = req.user.id
    const deletedPost = await deletePost(req.params.id, userId)
    res.status(200).json(deletedPost)
})