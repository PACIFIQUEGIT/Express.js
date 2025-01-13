const { Router } = require("express");
const { getAllUsers, getUserById, createUser, deleteUser, updateUser } = require("../../controllers/user.controller");
const { auth } = require("../../utils/middlewares/auth");

const usersRouter = Router();

usersRouter.route("/").get(auth, getAllUsers).post(createUser);
usersRouter.use(auth)
usersRouter.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);

module.exports = { usersRouter };  // Ensure this is correct
