const {User} = require("../../database/models/user")
const {Post} = require("../../database/models/post")
const AppError = require("../../utils/appError")
const bcrypt = require("bcryptjs")

exports.createUser = async (userData) => {
    try {
        const user = await this.findUserByEmail(userData.email)
        console.log("USER", user)
        if (user) {
            throw new AppError("User already exists", 409)
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashedPassword
        const newUser = await User.create(userData)
        const userObject = newUser.toObject()
        delete userObject.password
        return userObject
    } catch (error) {
        throw new AppError(error.message, error.statusCode || 500)
    }
}

exports.getUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate("posts")
        if (!user) { throw new AppError("User not found", 404)}
        const userPosts = await Post.find({author: userId})
        const userObject = user.toObject()
        userObject.posts =userPosts 
        return userObject
    } catch (error) {
        console.log("ERROR Finding User By Id", error)
        throw new AppError(error.message, 500)
    }
}

exports.findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email }).select("+password")
        return user
    } catch (error) {
        console.log("ERROR Finding User By Email", error)
    }
}

exports.updateUser = async (userId, userData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, userData, {new: true})
        if (!user) {throw new AppError("User not found", 404)}
        return user
    } catch (error) {
        console.log("ERROR Updating User", error)
    }
}

exports.deleteUser = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId)
        if (!user) {throw new AppError("User not found", 404)}
        return user
    } catch (error) {
        console.log("ERROR Deleting User", error)
    }
}

exports.getAllUsers = async () => {
    try {
        const users = await User.find().populate("posts", "title content")
        if (!users) {throw new AppError("Users not found", 404)}
        return users
    } catch (error) {
        console.log("ERROR Finding All Users", error)
    }
}