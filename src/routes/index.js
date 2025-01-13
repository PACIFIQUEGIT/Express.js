const { Router } = require("express");
const { usersRouter } = require("./users");
const { postsRouter } = require("./posts");
const { authRouter } = require("./auth");

const router = Router();

router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/auth", authRouter);

module.exports = router;  // Ensure this is correct
