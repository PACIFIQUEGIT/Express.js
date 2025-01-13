const { createUser, deleteUser, updateUser, getUserById, getAllUsers } = require("../services/user/user.service");
const AppError = require("../utils/appError");
const {catchAsync} = require("../utils/catchAsync");

exports.createUser = catchAsync(async (req, res, next) => {
    const { email, password, name } = req.body;
    
    // Validation check
    if (!email || !password || !name) {
        throw new AppError("Email, Password, and Name are required", 400);
    }

    // Calling the service layer to create the user
    const newUser = await createUser(req.body);

    // Sending the response back
    res.status(201).json(newUser);
});

exports.getUserById = catchAsync(async (req, res, next) => {
    // Fetching user by ID
    const user = await getUserById(req.params.id);

    // Sending response or handling case if no user is found
    if (!user) {
        return next(new AppError("User not found", 404));
    }
    
    res.status(200).json(user);
});

exports.updateUser = catchAsync(async (req, res, next) => {
    // Updating the user
    const updatedUser = await updateUser(req.params.id, req.body);

    // Handling case if no user was updated
    if (!updatedUser) {
        return next(new AppError("User not found", 404));
    }

    res.status(200).json(updatedUser);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    // Deleting the user
    const deletedUser = await deleteUser(req.params.id);

    // Handling case if no user was deleted
    if (!deletedUser) {
        return next(new AppError("User not found", 404));
    }

    res.status(200).json({ message: "User deleted successfully" });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    // Fetching all users
    const users = await getAllUsers();
    
    res.status(200).json(users);
});
