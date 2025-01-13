const { sign,verify } = require("jsonwebtoken")
const {config} = require("dotenv")
config()
const AppError = require("./appError")

const signToken = async (payload) => {
    return sign(payload, process.env.JWT_TOKEN, {
        expiresIn: "15m",
    })
}
const verifyToken = async (token) => {
    try {
        const decoded = verify(token, process.env.JWT_TOKEN, (error, decoded) => {
            if (error) {
                throw new AppError(error.message, 401)
            }
            return decoded
        })
        return decoded
    } catch (error) {
        throw new AppError(error.message, 401)
    }
}

module.exports = { signToken,verifyToken }