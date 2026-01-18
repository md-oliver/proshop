import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc    Auth User & token
// @route   Post /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc    Register user
// @route   Post /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res, next) => {
    res.send("Register User");
});

// @desc    Logout user / clear cookie
// @route   Post /api/users/logout
// @access  Private
export const logoutUser = asyncHandler(async (req, res, next) => {
    res.send("Logout User");
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
    res.send("User Profile");
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res, next) => {
    res.send("Update User Profile");
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/admin
export const getUsers = asyncHandler(async (req, res, next) => {
    res.send("Get Users");
});

// @desc    Get users
// @route   GET /api/users/:id
// @access  Private/admin
export const getUserById = asyncHandler(async (req, res, next) => {
    res.send("Get User by ID");
});

// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private/admin
export const deleteUser = asyncHandler(async (req, res, next) => {
    res.send("Delete User by ID");
});

// @desc    Update users
// @route   PUT /api/users/:id
// @access  Private/admin
export const updateUser = asyncHandler(async (req, res, next) => {
    res.send("Update User by ID");
});
