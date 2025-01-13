const express = require("express")
const router = require("./routes")
const app = express()
app.use(express.json())

app.use("/api/v1", router)
app.use("*", (req,res) => {
    res.status(404).json({error: "Not found"})
});

module.exports = app
