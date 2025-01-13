"use strict";
const {Post} = require("../../database/models/post")
const AppError = require("../../utils/appError")

exports.createPost = async(postData) => {
    try {
        const post = await Post.create(postData)
        return post
    } catch (error) {
        throw new AppError(error.message, 500)
    }
}

exports.getPostById = async(postId) => {
    try {
        const post = await Post.findById(postId).populate({
            path: "author",
            select:"name email"
        })
        if(!post) {
            throw new AppError("Post not found", 404)
        }
        return post
    } catch (error) {
        throw new AppError(error.message, 500)
    }
}

exports.getAllPosts = async() => {
    try {
        const posts = await Post.find().populate({
            path: "author",
            select: "name email"
        })
        return posts
    } catch (error) {
        throw new AppError(error.message, 500)
    }
}

exports.updatePost = async(postId, postData) => {
    try {
        const post = await Post.findByIdAndUpdate(postId, postData, {new: true})
        if(!post) {
            throw new AppError("Post not found", 404)
        }
    } catch (error) {
        throw new AppError(error.message, 500)
    }
}

exports.deletePost = async(postId, userId) => {
    try {
        const post = await this.getPostById(postId)
        if(!post) {
            throw new AppError("Post not found", 404)
        }
        if(post.author._id.toString() !== userId) {
            throw new AppError("You are not authorized to detete this user", 403)
        }
        await Post.deleteOne(post)
        return {message: "Post deleted successfully"}
    } catch (error) {
        throw new AppError("error.message", 500)
    }
}