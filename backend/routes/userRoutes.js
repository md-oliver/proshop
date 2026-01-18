import { Router } from "express";
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
} from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.route("/").post(registerUser).get(getUsers);
userRoutes.post("/logout", logoutUser);
userRoutes.post("/login", authUser);
userRoutes.route("/profile").get(getUserProfile).put(updateUserProfile);
userRoutes.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

export default userRoutes;
