const AppError = require("../appError")
const {catchAsync} = require("../catchAsync")
const {verifyToken} = require("../jwt")

exports.auth = catchAsync(async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization || !authorization.startsWith('Bearer'))
        return next(new AppError("Unauthorized", 401))

    const token = authorization?.split(" ")[1]
    if (!token) return next(new AppError("Unauthorized", 401))
    const decoded = await verifyToken(token)
    req.user = decoded
    next()
})