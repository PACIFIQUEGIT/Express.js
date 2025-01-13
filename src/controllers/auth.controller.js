const {findUserByEmail} = require("../services/user/user.service")
const AppError = require("../utils/appError")
const {catchAsync} = require("../utils/catchAsync")
const {signToken} = require("../utils/jwt")

exports.login = catchAsync(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new AppError("Email and Password are required", 400)
    }
    const user = await findUserByEmail(email)
    if (!user) {
        throw new AppError("Invalid Credentials", 401)
    }
    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
        throw new AppError("Invalid Credentials", 401)
    }
    const token = await signToken({ id: user._id, email: user.email })
    res.status(200).json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            email: user.email,
            name: user.name
        }
    })
})