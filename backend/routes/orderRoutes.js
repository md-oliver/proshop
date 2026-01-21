import { Router } from "express";
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const orderRoutes = Router();

orderRoutes
    .route("/")
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders);
orderRoutes.route("/mine").get(protect, getMyOrders);
orderRoutes.route("/:id").get(protect, admin, getOrderById);
orderRoutes.route("/:id/pay").put(protect, updateOrderToPaid);
orderRoutes.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default orderRoutes;
