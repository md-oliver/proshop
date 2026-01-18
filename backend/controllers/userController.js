import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth User & token
// @route   Post /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.status(200).json({
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
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error("User Already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
        });
    } else {
        res.status(400);
        throw new Error("Invalid User Data");
    }
});

// @desc    Logout user / clear cookie
// @route   Post /api/users/logout
// @access  Private
export const logoutUser = asyncHandler(async (req, res, next) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updateUser = await user.save();
        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found ");
    }
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
