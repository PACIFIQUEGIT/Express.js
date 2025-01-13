const app = require("./app")
const { config } = require("dotenv")
config()
const connectDB = require("./services/db/connect")
const errorHandler = require("./utils/errorHandler")
connectDB()
const PORT = process.env.PORT || 4000;
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
